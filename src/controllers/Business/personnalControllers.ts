import Personnal from "../../models/Business/Personnal";
import IPersonnalRepository from "../../repositories/Business/PersonnalRepositories";
import { jsonOne, jsonAll } from "../../utils/Reponse";
import { Request, Response, NextFunction } from "express";
import { PersonnalRepository } from "./personnalService";
import { IPersonnalInterface } from "../../interfaces/Business/PersonnalInterface";

export class PersonnalController {
    async createPersonnalUser(req: Request, res: Response, next: NextFunction){
        try {
            const personnalRepository: IPersonnalRepository = new PersonnalRepository()
    
            let resultPersonnal = await personnalRepository.createPersonnal(req)
    
            return jsonOne<IPersonnalInterface>(res, 200, resultPersonnal);

        } catch (error) {
            console.log("error in creating personnal Buisness Information..", error);
            next(error)
        }
    }

    async getPersonnalUser(req: Request, res: Response, next: NextFunction){
        try {
            const personnalRepository: IPersonnalRepository = new PersonnalRepository()

            let resultPersonnal = await personnalRepository.getPersonnal(req.params.id)

            return jsonOne<IPersonnalInterface>(res, 200, resultPersonnal);
            
        } catch (error) {
            console.log("error in getting personnal Business Information", error);
            next(error)
        }
    }

    async getAllPersonnalUser(req: Request, res: Response, next: NextFunction){
        try {
            const personnalRepository: IPersonnalRepository = new PersonnalRepository()

            let resultPersonnal = await personnalRepository.getAllPersonnal(req)

            const { personnal, meta } = resultPersonnal;

            return jsonAll<any>(res, 200, personnal, meta);

        } catch (error) {
            console.log("error in getting personnal information", error);
            next(error)
        }
    }

    async updatePersonnalUser(req: Request, res: Response, next: NextFunction){
        try {
            const personnalRepository: IPersonnalRepository = new PersonnalRepository()

            let resultPersonnal = await personnalRepository.updatePersonnal(req)

            return jsonOne<IPersonnalInterface>(res, 200, resultPersonnal);
            
        } catch (error) {
            console.log("error in updating personnal Information", error);
            next(error)
        }
    }

    async deletePersonnalUser(req: Request, res: Response, next: NextFunction){
        try {

            const personnalRepository: IPersonnalRepository = new PersonnalRepository()

            await personnalRepository.deletePersonnal(req.params.id)

            return jsonOne<string>(res, 200, 'Personnal Information Sucessfully Deleted');
            
        } catch (error) {
            console.log("error in deleting Personnal Information", error);
            next(error)
        }
    }
}