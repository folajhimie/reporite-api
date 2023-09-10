import { ICouponInterface } from "../../../interfaces/Production/Coupon/couponInterface";


export default interface ICouponRepository {
    createCouponCode(couponData: ICouponInterface): Promise<any>;
    getAllCoupons(): Promise<any>;
    getCouponById(reqParams: any): Promise<any>;
    updateCouponById(reqParams: any, couponData: ICouponInterface): Promise<any>;
    deleteCouponById(reqParams: any): Promise<any>;
}