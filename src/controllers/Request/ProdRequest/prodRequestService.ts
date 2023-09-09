import { HttpCode, AppError } from "../../../exceptions/appError";
import { ProductRequest } from "../../../models/Request/ProdRequest.ts/prodRequest";
import { IProductRequestInterface } from "../../../interfaces /Request/ProdRequest/prodRequestInterface";
import IProductRequestRepository from "../../../repositories/Request/prodRequest/prodRequestRepositories";
import { HelpFunction } from "../../../Helpers/helpFunction";
import { ApiFeatures } from "../../../utils/Feature";
import { Product } from "../../../models/Production/Product/product";
import { IProductInterface } from "../../../interfaces /Production/Product/productInterface";


export class ProductRequestRepository implements IProductRequestRepository {

    async createProductRequest(req: any): Promise<any> {
        try {
            let {
                productId,
                duration,
                startedDate,
                // expirationDate,
                quantity,
                vendorPrice,
                // productRequestLog,
            } = req.body;

            let date_expiration_string: number = Date.parse(startedDate) / 1000;

            const durationCode: string = 'weeks';

            var due_at = null;

            due_at =
                date_expiration_string +
                HelpFunction.timeToSeconds(
                    duration,
                    durationCode
                );

            const multiply_started_date = HelpFunction.multiplyDate(due_at)

            const dueOfDate = HelpFunction.dateFormat(multiply_started_date)

            const productRequestData = new ProductRequest({
                productId,
                duration,
                startedDate: startedDate,
                expirationDate: dueOfDate,
                quantity,
                vendorPrice,
                // productRequestLog,
            });

            await productRequestData.save();

        } catch (error) {
            console.log('Error adding product request to the table:', error);
        }
    }

    // Get all product requests
    async getAllProductRequests(req: any): Promise<any> {
        try {
            // const productRequests = await ProductRequest.find();

            const query = ProductRequest.find().populate('product').exec();
            const resultPerPage: number = 10;

            const productRequestCount = await ProductRequest.countDocuments();

            const apiFeatures = new ApiFeatures(req.query, query)
                .search()
                .filter()
                .pagination(resultPerPage)

            const prodRequest = await apiFeatures?.query


            const productRequestData = {
                prodRequest,
                resultPerPage,
                productRequestCount
            }

            return productRequestData;

        } catch (error) {
            console.error('Error fetching product requests:', error);
        }
    };

    // Get a product request by ID
    async getProductRequestById(req: any): Promise<any> {
        try {
            const productRequestId = req.params.productRequestId;
            const productRequest = await ProductRequest.findById(productRequestId).populate('product').exec();


            if (!productRequest) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not found with this id'
                });
            }

            return productRequest;
        } catch (error) {
            console.error('Error fetching product request:', error);
        }
    };

    // Update a product request by ID
    async updateProductRequestById(req: any): Promise<any> {
        try {
            const productRequestId = req.params.productRequestId;
            const {
                // productId,
                duration,
                startedDate,
                quantity,
                vendorPrice,
                // productRequestLog,
            } = req.body;

            const productRequest = await ProductRequest.findByIdAndUpdate(
                productRequestId,
                {
                    // productId,
                    duration,
                    startedDate,
                    quantity,
                    vendorPrice,
                    // productRequestLog,
                },
                { new: true }
            );

            if (!productRequest) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not found with this id'
                });
            }

            return productRequest;
        } catch (error) {
            console.error('Error updating product request:', error);
        }
    };

    // Delete a product request by ID
    async deleteProductRequestById(req: any): Promise<any> {
        try {
            const productRequestId = req.params.id; // Assuming you get the ID of the ProductRequest to delete from the request params

            // Find the ProductRequest by ID
            const productRequest = await ProductRequest.findById(productRequestId);

            if (!productRequest) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'ProductRequest is not found with this id'
                });
            }

            // Check if the ProductRequest is associated with a Product
            if (productRequest.productId) {
                // Find the associated Product
                const product: IProductInterface | null = await Product.findById(productRequest.productId);

                if (product) {
                    // Disassociate the ProductRequest from the Product
                    product.productRequest = null;
                    await product.save();
                }
            }

            // Delete the ProductRequest
            await ProductRequest.findByIdAndDelete(productRequestId);

            // Disassociate the ProductRequest from the associated Product
            // Assuming you have a reference to the Product in your ProductRequest model
            // productRequest.productId = null; // Set the productId to null or use an appropriate value

            // Save the ProductRequest to update the association
            // await productRequest.save();

            // Now you can safely delete the ProductRequest
            // await productRequest.deleteOne();


        } catch (error) {
            console.error('Error deleting ProductRequest:', error);
        }
    }



}