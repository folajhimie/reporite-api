import ICategoryRepository from "../../../repositories/Inventory/Category/categoryRepositories";
import { HttpCode, AppError } from "../../../exceptions/appError";
import { ICategoryInterface } from "../../../interfaces /Inventory/Category/categoryInterface";
import Category from "../../../models/Inventory/Category/category";
import Product from "../../../models/Production/Product/product";
import { IProductInterface } from "../../../interfaces /Production/Product/productInterface";



export class CategoryRepository implements ICategoryRepository {

    async createCategory(reqBody: any): Promise<any> {
        try {
            const { name } = reqBody;

            // Create a new category
            const category: ICategoryInterface = new Category({
                name,
            });

            // Save the category to the database
            await category.save();

            return category

        } catch (error) {
            console.error('Error creating category:', error);
        }
    }

    // Get all categories
    async getAllCategories(): Promise<any> {
        try {
            const categories: ICategoryInterface[] | null = await Category.find();

            return categories

        } catch (error) {
            console.error('Error getting categories:', error);
        }
    }

    // Get category by ID
    async getCategoryById(reqParamsId: string): Promise<any> {
        try {
            const categoryId: string = reqParamsId;

            const category: ICategoryInterface | null = await Category.findById(categoryId);

            if (!category) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Category not Found!'
                });
            }

            return category;

        } catch (error) {
            console.error('Error getting category by ID:', error);
        }
    }


    // Update category by ID
    async updateCategoryById(reqParamsId: string, reqBody: any): Promise<any> {
        try {
            const categoryId: string = reqParamsId;

            const { name } = reqBody;

            const updatedCategory: ICategoryInterface | null = await Category.findByIdAndUpdate(
                categoryId,
                { name },
                { new: true }
            );

            if (!updatedCategory) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Category not Found!'
                });
            }

            return updatedCategory;

        } catch (error) {
            console.error('Error updating category by ID:', error);

        }

    }

    // Delete category by ID (also deletes associated products)
    async deleteCategoryById(reqParamsId: string): Promise<any> {
        try {
            const categoryId: string = reqParamsId;

            // Delete associated products
            await Product.deleteMany({ category: categoryId });

            // Delete the category
            const deletedCategory: ICategoryInterface | null = await Category.findByIdAndDelete(categoryId);

            if (!deletedCategory) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Category not Found!'
                });
            }
            
            return deletedCategory;

        } catch (error) {
            console.error('Error deleting category by ID:', error);

        }
    }
}






