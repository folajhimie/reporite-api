import { IProductRequestLogInterface } from "../../../interfaces /Request/ProdRequestLog/prodRequestLogInterface";

export default interface IProductRequestLogRepository {
    makeOfferProductRequestLog(req: any): Promise<any>;
    getProductRequestLogId(req: any): Promise<any>;
    getAllProductRequestLog(req: any): Promise<any>;
    updateProductRequestLog(req: any): Promise<any>;
    deleteProductRequestLog(req: any): Promise<any>;
};
