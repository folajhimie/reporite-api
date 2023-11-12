import { IPersonnalInterface } from '../../interfaces/Business/PersonnalInterface';
import { Request, Response } from 'express';




export default interface IBusinessRepository {
    createPersonnal(req: Request | any): Promise<IPersonnalInterface | any >;
    getPersonnal(PersonnalId: string): Promise<IPersonnalInterface>;
    getAllPersonnal(requestQuery: any): Promise<any>;
    updatePersonnal(req: Request): Promise<any>;
    deletePersonnal(personnalId: string): Promise<void>;
}