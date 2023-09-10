import { IPromotionInterface } from "../../../interfaces/Production/Promotion/promotionInterface";

export default interface IPromotionRepository {
    createPromotion(promotionData: IPromotionInterface): Promise<any>;
    getSinglePromotion(reqParamsId: any): Promise<any>
    removePromotion(reqParamsId: any): Promise<any>
    getAllPromotion(): Promise<any>
}