import { HttpCode, AppError } from "../../../exceptions/appError";
import { ProductRequest } from "../../../models/Request/ProdRequest.ts/prodRequest";
import { IProductRequestInterface } from "../../../interfaces /Request/ProdRequest/prodRequestInterface";
import IProductRequestRepository from "../../../repositories/Request/prodRequest/prodRequestRepositories";
import { HelpFunction } from "../../../Helpers/helpFunction";
import { ApiFeatures } from "../../../utils/Feature";


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

            const query = ProductRequest.find();
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

            return productRequestData


        } catch (error) {
            console.error('Error fetching product requests:', error);
        }
    };

    // Get a product request by ID
    async getProductRequestById(req: any): Promise<any> {
        try {
            const productRequestId = req.params.productRequestId;
            const productRequest = await ProductRequest.findById(productRequestId);


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
    async deleteProductRequestById(req: any): Promise<any>{
        try {
            const productRequestId = req.params.productRequestId;
            const productRequest = await ProductRequest.findByIdAndDelete(productRequestId);

            if (!productRequest) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not found with this id'
                });
            }

            return productRequest;
        } catch (error) {
            console.error('Error deleting product request:', error);
        }
    };







}