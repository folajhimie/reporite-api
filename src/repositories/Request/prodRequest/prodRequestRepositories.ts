import { IProductRequestInterface } from "../../../interfaces /Request/ProdRequest/prodRequestInterface";

export default interface IProductRequestRepository {
    createProductRequest(req: any): Promise<any>;
    getAllProductRequests(req: any): Promise<any>;
    getProductRequestById(req: any): Promise<any>;
    updateProductRequestById(req: any): Promise<any>;
    deleteProductRequestById(req: any): Promise<any>;
}