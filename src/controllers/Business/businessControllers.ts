import Business from "../../models/Business/Business";
import IBusinessRepository from "../../repositories/Business/BusinessRepositories";
import { jsonOne, jsonAll } from "../../utils/Reponse";
import { Request, Response, NextFunction } from "express";
import { BusinessRepository } from "./businessService";
import { IBusinessInterface } from "../../interfaces/Business/BusinessInterface";



export class BusinessController {
    async createBusinnessUser(req: Request, res: Response, next: NextFunction){
        try {
            const businessRepository: IBusinessRepository = new BusinessRepository()
    
            let resultBusiness = await businessRepository.createBusiness(req)
    
            return jsonOne<IBusinessInterface>(res, 200, resultBusiness);

        } catch (error) {
            console.log("error in creating businesses", error);
            next(error)
        }
    }

    async getBusinessUser(req: Request, res: Response, next: NextFunction){
        try {
            const businessRepository: IBusinessRepository = new BusinessRepository()

            let resultBusiness = await businessRepository.getBusiness(req.params.id)

            return jsonOne<IBusinessInterface>(res, 200, resultBusiness);
            
        } catch (error) {
            console.log("error in getting businesses", error);
            next(error)
        }
    }

    async getAllBusinesses(req: Request, res: Response, next: NextFunction){
        try {
            const businessRepository: IBusinessRepository = new BusinessRepository()

            let resultBusiness = await businessRepository.getAllBusinesses(req)

            const { businesses, meta } = resultBusiness;

            return jsonAll<any>(res, 200, businesses, meta);
        } catch (error) {
            console.log("error in getting businesses", error);
            next(error)
        }
    }

    async updateBusiness(req: Request, res: Response, next: NextFunction){
        try {
            const businessRepository: IBusinessRepository = new BusinessRepository()

            let resultBusiness = await businessRepository.updateBusiness(req)

            return jsonOne<IBusinessInterface>(res, 200, resultBusiness);
            
        } catch (error) {
            console.log("error in updating businesses", error);
            next(error)
        }
    }

    async deleteBusiness(req: Request, res: Response, next: NextFunction){
        try {
            const businessRepository: IBusinessRepository = new BusinessRepository()

            await businessRepository.deleteBusiness(req.params.id)

            return jsonOne<string>(res, 200, 'Business Sucessfully Deleted');
            
        } catch (error) {
            console.log("error in deleting businesses", error);
            next(error)
        }
    }

}