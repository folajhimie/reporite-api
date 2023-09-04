import IWishListRepository from "../../../repositories/Production/WishList/wishListRepositories";
import { IWishListInterface } from "../../../interfaces /Production/WishList/wishListInterface";
import { HttpCode, AppError } from "../../../exceptions/appError";
import WishList from "../../../models/Production/WishList/wishList";
import { Request } from "express";
import Product from "../../../models/Production/Product/product";
// import { ParamsDictionary } from "express-serve-static-core";
// import { ParsedQs } from "qs";


export class WishListRepository implements IWishListRepository {
    // Add a product to the user's wish list
    async addWishList(req: Request): Promise<any> {
        try {
            const userId = req.user?._id // Assuming you have middleware to authenticate the user

            const productId = req.body.productId; // Assuming you send the productId in the request body

            // Check if the product with the given ID exists
            const productExists = await Product.exists({ _id: productId });
            if (!productExists) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not Found'
                });
            }

            // Check if the user already has a wish list, or create one if not
            let wishList: IWishListInterface | null = await WishList.findOne({ user: userId });


            if (!wishList) {
                wishList = new WishList({
                    user: userId,
                    products: [productId],
                });
                await wishList.save();
            } else {
                // Add the product to the user's wish list if it's not already there
                if (!wishList.products.includes(productId)) {
                    wishList.products.push(productId);
                    await wishList.save();
                }
            }

            return wishList
        } catch (error) {
            console.log('Error adding product to wish list:', error);
        }

    }

    async getWishListData(reqParamsId: any): Promise<any> {
        try {
            const wishList = await WishList.findById(reqParamsId).populate('product').populate('user');

            if (!wishList) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'wishList is not Found'
                });
            }

            return wishList


        } catch (error) {
            console.log('Error getting product to wish list:', error);
        }
    }

    async removeWishListData(reqParamsId: any): Promise<any> {
        try {
            const wishListData = await WishList.findById(reqParamsId);

            if (!wishListData) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'wishList is not Found'
                });
            }

            await wishListData.remove()

            // return wishList
        } catch (error) {
            console.log('Error getting product to wish list:', error);
        }
    }

    async getAllAdminWishList(): Promise<any> {
        try {
            const wishListData = await WishList.find().sort({
                createdAt: -1,
            });

            if (!wishListData) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'wishList is not Found'
                });
            }

            return wishListData;
       
        } catch (error) {
            console.log('Error getting product to wish list:', error);
        }
    }
}