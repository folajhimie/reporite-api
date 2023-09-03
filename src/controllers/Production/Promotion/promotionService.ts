import IPromotionRepository from "../../../repositories/Production/Promotion/promotionRepositories";
import Product from "../../../models/Production/Product/product";
import Promotion from "../../../models/Production/Promotion/promotion";
import { HttpCode, AppError } from "../../../exceptions/appError";
import { IPromotionInterface } from "../../../interfaces /Production/Promotion/promotionInterface";
import { IProductInterface } from "../../../interfaces /Production/Product/productInterface";


export class PromotionRepository implements IPromotionRepository {

    async createPromotion(promotionData: IPromotionInterface): Promise<any> {

        try {
            // Extract the product ID and discount percentage from the request body
            const { productId, discountPercentage } = promotionData;

            // Find the product by ID
            const product: IProductInterface | null = await Product.findById(productId);

            if (!product) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product not found with this ID'
                });
            }

            // Create a new promotion
            const promotion: IPromotionInterface = new Promotion({
                product: product._id, // Associate the product with the promotion
                discountPercentage,
                // ... other promotion fields
            });

            // Save the promotion to the database
            await promotion.save();

            return promotion

        } catch (error) {
            console.log('Error creating promotion:', error);
        }

    }

    async getSinglePromotion(reqParamsId: any): Promise<any> {
        try {
            const promotion = await Promotion.findById(reqParamsId);

            if (!promotion) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'promotion is not Found'
                });
            }

            return promotion


        } catch (error) {
            console.log('Error getting product to wish list:', error);
        }
    }

    async getAllPromotion(): Promise<any> {
        try {
            const promotions = await Promotion.find().sort({
                createdAt: -1,
            });;

            if (!promotions) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'All Promotion is not Found'
                });
            }

            return promotions;

        } catch (error) {
            console.log('Error getting product to wish list:', error);
        }
    }

    async removePromotion(reqParamsId: any): Promise<any> {
        try {
            const promotion = await Promotion.findById(reqParamsId);

            if (!promotion) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'wishList is not Found'
                });
            }

            await promotion.remove()

            // return wishList
        } catch (error) {
            console.log('Error getting product to wish list:', error);
        }
    }

}

