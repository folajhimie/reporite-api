import { ICategoryInterface } from "../../../interfaces/Inventory/Category/categoryInterface";

export default interface ICategoryRepository {
    // END POINTS FOR CATEGORY
    createCategory(reqBody: any): Promise<any>;
    getAllCategories(): Promise<any>;
    getCategoryById(reqParamsId: string): Promise<any>;
    updateCategoryById(reqParamsId: string, reqBody: any): Promise<any>;
    deleteCategoryById(reqParamsId: string): Promise<any>;
}




  
  
  
  
  
  