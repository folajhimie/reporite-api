import { IProductInterface, IReview } from "../../../interfaces /Production/Product/productInterface";

export default interface IProductRepository {
    // END POINT FOR PRODUCT 
    createProduct(productData: Partial<IProductInterface>): Promise<any>;
    getAllProducts(reqQuery: any): Promise<any>;
    searchProducts(reqQuery: any): Promise<any>;
    getSingleProduct(reqParamsId: any): Promise<any>;
    updateProduct(reqId: any, reqBody:any): Promise<any>;
    deleteProduct(reqParamsId: any): Promise<void>;
    getAdminProducts(): Promise<any>;

    // END POINT FOR SHOP PRODUCT 
    // getAllProductShop(product: IProductInterface): Promise<IProductInterface>;
    // deleteShopProduct(product: IProductInterface): Promise<IProductInterface>;

    // END POINT FOR REVIEW
    createNewReview(productData: IReview, reqUser: any): Promise<any>;
    getProductReviews(reqQuery: any): Promise<any>;
    deleteReview(reqQuery: any): Promise<any>;


}