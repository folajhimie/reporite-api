import { IOrderItemInterface, IOrderInterface } from "../../../interfaces/Production/Order/orderInterface";
import { Response, Request } from "express";

export default interface IOrderRepository {
    // END POINT FOR PRODUCT 
    createOrder(request: Request): Promise<any>;
    getSingleOrder(reqParamsId: any): Promise<any>;
    getSellerAllOrders(reqParamsId: any): Promise<any>
    // getAllOrders(reqQuery: any): Promise<any>;
    // getAdminAllOrders(reqParamsId: any): Promise<any>;
    updateOrderStatus(req: Request, orderData: IOrderInterface): Promise<any>;
    orderRefund(req: Request): Promise<any>;
    orderRefundSuccess(req: Request): Promise<any>;
    adminAllOrders(): Promise<any>;
    // deleteOrder(reqParamsId: any): Promise<void>;
}