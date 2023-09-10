import { IWishListInterface } from "../../../interfaces/Production/WishList/wishListInterface";
import { Request, Response } from 'express';


export default interface IWishListRepository {
    addWishList(req: Request): Promise<any>;
    getWishListData(reqParamsId: any): Promise<any>
    removeWishListData(reqParamsId: any): Promise<any>
    getAllAdminWishList(): Promise<any>
}



