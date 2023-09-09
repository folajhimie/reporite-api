import { IProductRequestLogInterface } from "../../../interfaces /Request/ProdRequestLog/prodRequestLogInterface";

export default interface IProductRequestLogRepository {
    makeOfferProductRequestLog(req: any): Promise<any>;
}