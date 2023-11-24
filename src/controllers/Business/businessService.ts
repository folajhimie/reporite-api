import { AppError, HttpCode } from "../../exceptions/appError";
import Business from "../../models/Business/Business";
import { IBusinessInterface } from "../../interfaces/Business/BusinessInterface";
import IBusinessRepository from "../../repositories/Business/BusinessRepositories";
// import cloudinary from 'cloudinary';
import { Request } from 'express';
// import { validateCreateBusiness } from "../../validator/business/BusinessValidator";
import { CloudinaryService } from "../../utils/Cloudinary";
import { HelpFunction } from "../../Helpers/helpFunction";

export class BusinessRepository implements IBusinessRepository {

    async createBusiness(req: Request | any ): Promise<IBusinessInterface | any> {
        try {

            console.log("object..", req.body);
            const { 
                businessname,
                businesstype,
                businessaccount,
                businesscategory,
                country,
                state,
                businessaddress,
                estimatedmonthly, 
            }= req.body as IBusinessInterface; // Assuming the request body contains the necessary data

            const businesses: IBusinessInterface | any = await Business.find();
            
            let businesscode: string;
            
            const getBusinessCode: string | number = HelpFunction.addZeroToSingleDigit(businesses.length)

            businesscode = `CRT/BUS/${getBusinessCode}`;
            console.log("user code..", businesscode, businesses);
            
            // Check if the business already exists
            const existingBusiness = await Business.findOne({
                businessname
            });

            if (existingBusiness) {
                throw new AppError({ 
                    httpCode: HttpCode.UNAUTHORIZED, 
                    description: 'Business Found' 
                });
            }

            let newBusiness = new Business({
                businessname,
                businesstype,
                businessaccount,
                businesscategory,
                businesscode,
                country,
                state,
                businessaddress,
                estimatedmonthly, 
            });

            console.log("new business...", newBusiness);

            let createdBusiness = await newBusiness.save();

            return createdBusiness

        } catch (error) {
            console.error('Error creating business:', error);
        } 
    }

    async getBusiness(businessId: string): Promise<IBusinessInterface> {

        let business = await Business.findById(businessId).exec();
        if (!business) {
            throw new AppError({ 
                httpCode: HttpCode.UNAUTHORIZED, 
                description: 'Business not Found' 
            });
        }
        return business
    }

    async getAllBusinesses(requestQuery: any): Promise<any> {
        let pageOptions: { page: number; limit: number } = {
            page: Number(requestQuery.query.page) || 1,
            limit: Number(requestQuery.query.limit) || 10
        }

        const count = await Business.countDocuments({});

        //GETTING DATA FORM TABLE
        let businesses = await Business.find()
            .populate('user')
            .populate('products')
            .populate('personnal')
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
            businesses,
            meta
        }
        return responseType;
    }

    async updateBusiness(req: Request): Promise<any> {
        
        // const i = req; 
        const businessId = req?.params.id;

        let businessData: IBusinessInterface | any = await Business.findById(businessId).exec();

        //IF USER IS NOT FOUND 
        if (!businessData) {
            throw new AppError({ 
                httpCode: HttpCode.NOT_FOUND, 
                description: 'Business not found!' 
            });
        }

        const imageId = businessData?.avatar?.public_id

        // await cloudinary.v2.uploader.destroy(imageId);
        await CloudinaryService.destroyImage(imageId);
        const myCloud = await CloudinaryService.uploadImage(businessData?.avatar, "business");

        const businessImage = businessData.avatar = {
            public_id: myCloud.public_id,
            secure_url: myCloud.secure_url,
        };

        const newBusinessData = {
            businessName: businessData?.businessName,
            businessType: businessData?.businessType,
            businessAccount: businessData?.businessAccount,
            businessCategory: businessData?.businessCategory,
            businessCode: businessData?.businessCode,
            country: businessData?.country,
            state: businessData?.state,
            businessAddresss: businessData?.businessAddress,
            estimatedMonthly: businessData?.estimatedMonthly,
            businessAvatar: businessImage,
            businessDescription: businessData?.businessDescription,
        };


        let savedBusiness = await Business.findByIdAndUpdate(
            { _id: businessData.id },
            {
                newBusinessData
            },
            { 
                new: true,
                runValidator: true,
                useFindAndModify: false,
            } // Return the updated document
        )

        return savedBusiness;
    }

    async deleteBusiness(businessId: string): Promise<void> {

        const business: IBusinessInterface | any = await Business.findById(businessId).exec();
        if (!business) {
            throw new AppError({ 
                httpCode: HttpCode.NOT_FOUND, 
                description: 'Business not found!'
            });
        }
        
        const businessImageId = business?.avatar?.public_id

        // await cloudinary.v2.uploader.destroy(businessImageId);

        await CloudinaryService.destroyImage(businessImageId);

        //CHECK IF USER IS FOUND 
        await Business.findByIdAndDelete(businessId)
    }
}