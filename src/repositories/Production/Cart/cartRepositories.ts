import { ICartInterface } from "../../../interfaces/Production/Cart/cartInterface";

export default interface IcartRepository {
    // END POINTS FOR CART
    createCartItem(reqBody: any): Promise<any>;
    getCartByUser(reqParams: any): Promise<any>;
    updateCartItem(reqBody: any): Promise<any>;
    removeCartItem(reqParams: any): Promise<any>;
}