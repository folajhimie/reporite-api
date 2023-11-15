import { AppError, HttpCode } from "../../exceptions/appError";
// import Business from "../../models/Business/Business";
// import cloudinary from 'cloudinary';
import { Request } from 'express';
import Personnal from "../../models/Business/Personnal";
import { IPersonnalInterface } from "../../interfaces/Business/PersonnalInterface";
import IPersonnalRepository from "../../repositories/Business/PersonnalRepositories";
import { validateCreatePersonnal } from "../../validator/business/PersonnalValidator";
import { CloudinaryService } from "../../utils/Cloudinary";



export class PersonnalRepository implements IPersonnalRepository {

    async createPersonnal(req: Request | any ): Promise<IPersonnalInterface | any> {
        try {
            // Extract data from the request body
            await validateCreatePersonnal(req)

            const personnalData = req.body as IPersonnalInterface; // Assuming the request body contains the necessary data
    
            // Upload images to Cloudinary
            const businessVerificationImage = req.files['businessVerificationImage'][0];
            const businessUtilityBill = req.files['businessUtilityBill'][0];
    
            // const bvImageResult = await cloudinary.v2.uploader.upload(businessVerificationImage.buffer.toString('base64'));
            const bvImageResult = await CloudinaryService.uploadImage(businessVerificationImage.buffer.toString('base64'), "business");

            const buImageResult = await CloudinaryService.uploadImage(businessUtilityBill.buffer.toString('base64'), "business");
    
            // Update the personnalData with Cloudinary URLs
            personnalData.businessVerificationImage = {
                public_id: bvImageResult.public_id,
                secure_url: bvImageResult.secure_url,
            };
            personnalData.businessUtilityBill = {
                public_id: buImageResult.public_id,
                secure_url: buImageResult.secure_url,
            };
    
            // Create the Personnal entity
            // const createdPersonnal: PersonnalDocument = await Personnal.create(personnalData);

            const createdPersonnal: IPersonnalInterface = await Personnal.create(personnalData);

            return createdPersonnal;

        } catch (error) {
            console.error('Error creating personnal:', error);
            // console.error('Error creating business:', error);
        }
    }



    async getPersonnal(personnalId: string): Promise<IPersonnalInterface> {

        let personnal = await Personnal.findById(personnalId).exec();
        if (!personnal) {
            throw new AppError({ 
                httpCode: HttpCode.UNAUTHORIZED, 
                description: 'personnal not Found' 
            });
        }
        return personnal
    }

    async getAllPersonnal(requestQuery: any): Promise<any> {
        let pageOptions: { page: number; limit: number } = {
            page: Number(requestQuery.query.page) || 1,
            limit: Number(requestQuery.query.limit) || 10
        }

        const count = await Personnal.countDocuments({});

        //GETTING DATA FORM TABLE
        let personnal = await Personnal.find()
            .limit(pageOptions.limit * 1)
            .skip((pageOptions.page - 1) * pageOptions.limit)
            .sort({ createdAt: 1 });

        //CREATE PAGINATION 
        const meta = {
            total: count,
            limit: pageOptions.limit,
            totalPages: Math.ceil(count / pageOptions.limit),
            currentPage: pageOptions.page
        }

        const responseType = {
            personnal,
            meta
        }
        return responseType;
    }

    async updatePersonnal(req: Request | any): Promise<any> {
        
        // const i = req; 
        const personnalId = req?.params.id;

        const personnalData: IPersonnalInterface | any = await Personnal.findById(personnalId).exec();

        //IF USER IS NOT FOUND 
        if (!personnalData) {
            throw new AppError({ 
                httpCode: HttpCode.NOT_FOUND, 
                description: 'personnal not found!' 
            });
        }

        let businessVerificationImage;
        let businessUtilityBill;
    
        // Upload images to Cloudinary
        if(req.files['businessVerificationImage'][0]){
            businessVerificationImage = req.files['businessVerificationImage'][0];
            const verificationImage = personnalData?.businessVerificationImage?.public_id;
            await CloudinaryService.destroyImage(verificationImage);
        }

        if(req.files['businessUtilityBill'][0]){
            businessUtilityBill = req.files['businessUtilityBill'][0];
            const utilityImage = personnalData?.businessVerificationImage?.public_id;
            await CloudinaryService.destroyImage(utilityImage);
        } 

        // const bvImageResult = await cloudinary.v2.uploader.upload(businessVerificationImage.buffer.toString('base64'));
        const bvImageResult = await CloudinaryService.uploadImage(businessVerificationImage.buffer.toString('base64'), "business");
        const buImageResult = await CloudinaryService.uploadImage(businessUtilityBill.buffer.toString('base64'), "business");

        // Update the personnalData with Cloudinary URLs
        personnalData.businessVerificationImage = {
            public_id: bvImageResult.public_id,
            secure_url: bvImageResult.secure_url,
        };
        personnalData.businessUtilityBill = {
            public_id: buImageResult.public_id,
            secure_url: buImageResult.secure_url,
        };

        const newPersonnalData = {
            businessVerificationType: personnalData?.businessVerificationType,
            businessVerificationNumber: personnalData?.businessVerificationNumber,
            businessVerificationImage: personnalData?.businessVerificationImage,
            businessUtilityBill: personnalData?.businessUtilityBill,
        };

        let savedPersonnal = await Personnal.findByIdAndUpdate(
            { _id: personnalData.id },
            {
                newPersonnalData
            },
            { 
                new: true,
                runValidator: true,
                useFindAndModify: false,
            } // Return the updated document
        )

        return savedPersonnal;
    }

    async deletePersonnal(personnalId: string): Promise<void> {

        const personnal: IPersonnalInterface | any = await Personnal.findById(personnalId).exec();
        if (!personnal) {
            throw new AppError({ 
                httpCode: HttpCode.NOT_FOUND, 
                description: 'personnal not found!'
            });
        }

        const verificationImage = personnal?.businessVerificationImage?.public_id;
        await CloudinaryService.destroyImage(verificationImage);

        const utilityImage = personnal?.businessVerificationImage?.public_id;
        await CloudinaryService.destroyImage(utilityImage);
        
        //CHECK IF USER IS FOUND 
        await Personnal.findByIdAndDelete(personnalId)
    }
}