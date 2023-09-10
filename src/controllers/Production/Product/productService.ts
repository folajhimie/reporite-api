import IProductRepository from "../../../repositories/Production/Product/productRepositories";
import { IProductInterface, IProductImage, IReviewInterface } from "../../../interfaces/Production/Product/productInterface";
import { Product, Review } from "../../../models/Production/Product/product";
import { AppError, HttpCode } from "../../../exceptions/appError";
import Shop from "../../../models/Production/Shop/shop";
import cloudinary from 'cloudinary';

import { ApiFeatures } from "../../../utils/Feature";
import { IShopInterface } from "../../../interfaces/Production/Shop/shopInterface";



export class ProductRepository implements IProductRepository {

    async createProduct(productData: IProductInterface): Promise<any> {

        try {
            // Validate shop existence
            let { shopId, images } = productData;  // Assuming the request contains the shopId

            const shopData: IShopInterface | null = await Shop.findById(shopId);
            if (!shopData) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Shop is not Found'
                });
            } else {
                // const { images, ...productData } = req.body;
                let imagesData: any[] = [];

                // VERIFYING THE IMAGE TYPE BEFORE WE SAVE IT
                if (typeof images === "string") {
                    imagesData.push(images);
                } else {
                    imagesData = images;
                }

                const imagesLinks: IProductImage[] = [];

                for (let i = 0; i < imagesData.length; i++) {
                    const result = await cloudinary.v2.uploader.upload(imagesData[i], {
                        folder: "products",
                    });

                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });
                }

                // images = imagesLinks;

                const productInfo = {
                    name: productData.name,
                    description: productData.description,
                    category: productData.category,
                    originalPrice: productData.originalPrice,
                    discountPrice: productData.discountPrice,
                    vendorPrice: productData.vendorPrice,
                    min_stock: productData.min_stock,
                    max_stock: productData.max_stock,
                    stock: productData.stock,
                    images: imagesLinks,
                    shopId: shopId, // You might want to specify the shop schema here
                    reviews: [], // Empty reviews array
                };

                // Create the product
                const product = await Product.create(productInfo);

                // check if shop exist and then query the products array
                if (Array.isArray(shopData.products)) {

                    // if the products id does not exist in the shop model push the product id into the shop
                    if (!shopData.products.includes(product._id)) {
                        shopData.products.push(product._id);
                        await shopData.save();
                    }
                }

                return product;
            }

        } catch (error) {
            console.error("Error creating product:", error);

        }
    }

    async getAdminProducts(): Promise<any> {
        try {
            const products = await Product.find().sort({
                createdAt: -1,
            });

            return products;

        } catch (error) {
            console.error("Error getting product:", error);
        }
    }

    async getAllProducts(reqQuery: any): Promise<any> {

        try {
            const resultPerPage: number  = 10; // Number of results per page
            const query = Product.find(); // Your query for fetching products

            const productsCount = await Product.countDocuments();

            const apiFeatures = new ApiFeatures(reqQuery, query)
                .search()
                .filter()
                .pagination(resultPerPage);

            const products = await apiFeatures?.query;

            const productData = {
                products,
                resultPerPage,
                productsCount
            }

            return productData;

        } catch (error) {
            console.error("Error getting products:", error);
        }
    }

    async searchProducts(reqQuery: any): Promise<any> {

        try {
            const { query, page = 1, limit = 10, category, minPrice, maxPrice } = reqQuery;

            // Build the filter conditions based on query parameters
            const filter: any = {};
            if (query) {
                filter.name = { $regex: query, $options: "i" };
            }
            if (category) {
                filter.category = category;
            }
            if (minPrice) {
                filter.price = { $gte: parseInt(minPrice.toString()) };
            }
            if (maxPrice) {
                filter.price = { ...filter.price, $lte: parseInt(maxPrice.toString()) };
            }

            // Apply pagination
            const skip = (parseInt(page.toString()) - 1) * parseInt(limit.toString());
            const products = await Product.find(filter)
                .skip(skip)
                .limit(parseInt(limit.toString()));

            const totalProducts = await Product.countDocuments(filter);

            const productData = {
                products,
                currentPage: parseInt(page.toString()),
                totalPages: Math.ceil(totalProducts / parseInt(limit.toString())),
            }

            return productData


        } catch (error) {
            console.error("Error getting products:", error);
        }
    }

    async updateProduct(reqId: any, reqBody: any): Promise<any> {

        let { images } = reqBody;
        try {
            let product = await Product.findById(reqId);
            if (!product) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not found with this id'
                });
            }

            let imagesData: any[] = [];

            // VERIFYING THE IMAGE TYPE BEFORE WE SAVE IT
            if (typeof images === "string") {
                imagesData.push(images);
            } else {
                imagesData = images;
            }

            if (imagesData !== undefined) {
                // Delete image from cloudinary
                for (let i = 0; i < product.images.length; i++) {
                    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
                }

                const imagesLinks = [];

                for (let i = 0; i < imagesData.length; i++) {
                    const result = await cloudinary.v2.uploader.upload(imagesData[i], {
                        folder: "products",
                    })
                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });
                }

                images = imagesLinks;


            }
            product = await Product.findByIdAndUpdate(reqId, reqBody, {
                new: true,
                runValidators: true,
                useUnified: false,
            })

            return product;

        } catch (error) {
            console.error("Error updating products:", error);
        }
    }

    async deleteProduct(reqParamsId: any): Promise<void> {

        const product = await Product.findById(reqParamsId)
        try {
            if (!product) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not found with this id'
                });
            }

            // Deleting images from cloudinary 
            for (let i = 0; i < product.images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(
                    product.images[i].public_id
                );
            }

            await product.remove();

        } catch (error) {
            console.error("Error deleting products:", error);
        }
    }

    async getSingleProduct(reqParamsId: any): Promise<any> {

        try {
            const product = await Product.findById(reqParamsId);

            if (!product) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not found with this id'
                });
            }

            return product;

        } catch (error) {
            console.error("Error getting single products:", error);
        }
    }

    async createNewReview(
        req: any,
    ): Promise<any> {
        try {
            const { rating, comment, productId, title } = req.body;
            const userId = req.user._id; // Assuming you have user information in the request

            // Find the product by ID
            const product: IProductInterface | null = await Product.findById(productId);

            if (!product) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not found with this id'
                });
            }

            // // Check if the user has already reviewed this product
            // const existingReviewIndex = product.reviews.findIndex(
            //     (rev) => rev.userId.toString() === userId.toString()
            // );

            // if (existingReviewIndex !== -1) {
            //     // Update the existing review
            //     const existingReview = product.reviews[existingReviewIndex];
            //     existingReview.title = title;
            //     existingReview.rating = rating;
            //     existingReview.comment = comment;
            // } else {
            //     // Create a new review
            //     const newReviews: IReviewInterface = {
            //         userId,
            //         title,
            //         rating,
            //         comment,
            //         productId,
            //     };

            //     product.reviews.push(newReviews);
            // }

            // Check if the user has already reviewed the product
            const existingReview = await Review.findOne({ productId, userId });

            // userReviewIndex !== -1
            // Update existing review
            // When userReviewIndex is equal to -1, it means that the element is not present in the array.

            if (existingReview) {
                // Update the existing review
                existingReview.title = title;
                existingReview.rating = rating;
                existingReview.comment = comment;

                await existingReview.save();
            } else {
                // Create a new review
                const newReview: IReviewInterface = new Review({
                    userId,
                    title,
                    rating,
                    comment,
                    productId,
                });

                // Save the new review
                await newReview.save();

                // Add the review to the product's reviews array
                product.reviews.push(newReview);

                // Update the number of reviews and average ratings for the product
                product.numOfReviews = product.reviews.length;

                let totalRatings = 0;
                product.reviews.forEach((rev) => {
                    totalRatings += rev.rating;
                });
                product.ratings = totalRatings / product.reviews.length;

                await product.save();
            }

        } catch (error) {
            console.error('Error creating/updating review:', error);
        }
    };

    // Get reviews for a specific product
    async getReviewsByProductId(req: any): Promise<any> {
        try {
            const productId = req.params.productId;
            const product = await Product.findById(productId);

            if (!product) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not found with this id'
                });
            }

            return product.reviews;

        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    async deleteReviewById(req: any): Promise<any> {
        try {
            const reviewId = req.params.reviewId;
            const userId = req.user._id; // Assuming you have user authentication middleware

            const product = await Product.findOneAndUpdate(
                { 'reviews._id': reviewId, 'reviews.userId': userId },
                {
                    $pull: { reviews: { _id: reviewId } },
                },
                { new: true }
            );

            if (!product) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not found with this id'
                });
            }

            // Recalculate the average rating for the product

            let totalRating = 0;
            product.reviews.forEach((review) => {
                totalRating += review.rating;
            });

            product.ratings = product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

            // Recalculate the number of reviews
            const numOfReviews = product.reviews.length;

            await product.save();

        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    // async deleteReview(reqQuery: any): Promise<any> {
    //     try {
    //         const product = await Product.findById(reqQuery.productId);

    //         if (!product) {
    //             throw new AppError({
    //                 httpCode: HttpCode.NOT_FOUND,
    //                 description: 'Product is not found with this id'
    //             });
    //         }

    //         const reviews = product.reviews.filter(
    //             (rev) => rev._id.toString() !== reqQuery.id.toString()
    //         );

    //         let avg = 0

    //         reviews.forEach((rev) => {
    //             avg += rev.rating
    //         });

    //         let ratings = 0;

    //         if (reviews.length === 0) {
    //             ratings = 0;
    //         } else {
    //             ratings = avg / reviews.length;
    //         }

    //         const numOfReviews = reviews.length;

    //         await Product.findByIdAndUpdate(
    //             reqQuery.productId,
    //             {
    //                 reviews,
    //                 ratings,
    //                 numOfReviews,
    //             },
    //             {
    //                 new: true,
    //                 runValidators: true,
    //                 useFindAndModify: false,
    //             }
    //         );




    //     } catch (error) {

    //     }
    // }

}

// import { Request, Response } from "express";
// import Product from "./path-to-your-product-model"; // Import your Product model

// class ApiFeatures {
//     private queryStr: { [key: string]: string };
//     private query: any;

//     constructor(queryStr: { keyword?: string }, query: any) {
//         this.queryStr = queryStr;
//         this.query = query;
//     }

//     search(): ApiFeatures {
//         const keyword = this.queryStr.keyword
//             ? {
//                 name: {
//                     $regex: this.queryStr.keyword,
//                     $options: "i",
//                 },
//             }
//             : {};
//         this.query = this.query.find({ ...keyword });
//         return this;
//     }

//     filter(): ApiFeatures {
//         const queryCopy = { ...this.queryStr };
//         const removeFields: string[] = ["keyword", "page", "limit"];
//         removeFields.forEach((key) => delete queryCopy[key]);
//         this.query = this.query.find(queryCopy);
//         return this;
//     }

//     pagination(resultPerPage: number): ApiFeatures {
//         const currentPage = Number(this.queryStr.page) || 1;
//         const skip = resultPerPage * (currentPage - 1);
//         this.query = this.query.limit(resultPerPage).skip(skip);
//         return this;
//     }
// }

// export const getAllProducts = async (req: Request, res: Response) => {
//     try {
//         const resultPerPage = 10; // Number of results per page
//         const query = Product.find(); // Your query for fetching products

//         const apiFeatures = new ApiFeatures(req.query, query)
//             .search()
//             .filter()
//             .pagination(resultPerPage);

//         const products = await apiFeatures.query;

//         res.json({ products });
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// import { Request, Response } from "express";
// import Product from "./path-to-your-product-model"; // Import your Product model

// export const getAllProducts = async (req: Request, res: Response) => {
//     try {
//         const page = parseInt(req.query.page as string) || 1;
//         const limit = parseInt(req.query.limit as string) || 10;
//         const skip = (page - 1) * limit;

//         const searchQuery = req.query.search as string;
//         const filterQuery = req.query.filter as string; // Implement your own filtering logic

//         let query: any = {};

//         if (searchQuery) {
//             query.name = { $regex: searchQuery, $options: "i" };
//         }

//         if (filterQuery) {
//             // Implement your own filter handling logic here
//             // For example, if you have a category filter:
//             // query.category = filterQuery;
//         }

//         const products = await Product.find(query)
//             .skip(skip)
//             .limit(limit)
//             .exec();

//         const totalProducts = await Product.countDocuments(query);

//         res.status(200).json({
//             products,
//             currentPage: page,
//             totalPages: Math.ceil(totalProducts / limit),
//         });
//     } catch (error) {
//         console.error("Error getting products:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };


