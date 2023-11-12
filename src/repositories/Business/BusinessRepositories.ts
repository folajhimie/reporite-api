import { IBusinessInterface } from "../../interfaces/Business/BusinessInterface";
import { Request, Response } from 'express';




export default interface IBusinessRepository {
    createBusiness(req: Request | any): Promise<IBusinessInterface | any >;
    getBusiness(businessId: string): Promise<IBusinessInterface>;
    getAllBusinesses(requestQuery: any): Promise<any>;
    updateBusiness(req: Request): Promise<any>;
    deleteBusiness(businessId: string): Promise<void>;
}