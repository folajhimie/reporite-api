import ICouponRepository from "../../../repositories/Production/CoupounCode/coupounCodeRepositories";
import { ICouponInterface } from "../../../interfaces /Production/Coupon/couponInterface";
import Coupon from "../../../models/Production/Coupon/coupon";
import { HttpCode, AppError } from "../../../exceptions/appError";



export class CouponRepository implements ICouponRepository {

    async createCouponCode(couponData: ICouponInterface): Promise<any> {
        // Create a new coupon
        try {
            const { name, value, minAmount, maxAmount, shopId, selectedProduct } = couponData;

            const isCouponCodeExists = await Coupon.find({ "name": name });

            if (!isCouponCodeExists) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not Found'
                });
            }

            const coupon: ICouponInterface = new Coupon({
                name,
                value,
                minAmount,
                maxAmount,
                shopId,
                selectedProduct,
            });

            const savedCoupon = await coupon.save();

            return savedCoupon

        } catch (error) {
            console.error('Error creating coupon:', error);
        }
    }
    
    async getAllCoupons(): Promise<any> {
        // Get all coupons
        try {

            const coupons = await Coupon.find().sort({
                createdAt: -1,
            });

            if (!coupons) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'All Coupons is not Found'
                });
            }

            return coupons

        } catch (error) {
            console.error('Error fetching coupons:', error);
        }

    }

    async getCouponById(reqParams: any): Promise<any> {
        
        // Get a coupon by ID
        try {
            const couponId: string = reqParams.couponId; // Assuming you pass the couponId in the URL
        
            const coupon: ICouponInterface | null = await Coupon.findById(couponId);

            if (!coupon) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Coupons is not Found'
                });
            }
        
            return coupon

        } catch (error) {
            console.error('Error fetching coupon by ID:', error);
        }
    }

    async updateCouponById(reqParams: any, couponData: ICouponInterface): Promise<any> {
        // Update a coupon by ID
        try {
            const couponId: string = reqParams.couponId; // Assuming you pass the couponId in the URL
        
            // const coupon: ICouponInterface | null = await Coupon.findById(couponId);

            
            const { name, value, minAmount, maxAmount, shopId, selectedProduct } = couponData;
            
            const updatedCoupon: ICouponInterface | null = await Coupon.findByIdAndUpdate(
                couponId,
                {
                    name,
                    value,
                    minAmount,
                    maxAmount,
                    selectedProduct,
                },
                { new: true }
            );

            if (!updatedCoupon) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Coupons is not Found'
                });
            }
                
            
                
        } catch (error) {
            console.error('Error updating coupon by ID:', error);
        }
        
    }

    async deleteCouponById(reqParams: any): Promise<any> {
        // Delete a coupon by ID
        try {
            const couponId: string = reqParams.couponId;
        
            const deletedCoupon: ICouponInterface | null = await Coupon.findByIdAndDelete(couponId);
        
            if (!deletedCoupon) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Coupons is not Found'
                });
            }
        
            return deletedCoupon
        } catch (error) {
            console.error('Error deleting coupon by ID:', error);
        }
        
    }


}

