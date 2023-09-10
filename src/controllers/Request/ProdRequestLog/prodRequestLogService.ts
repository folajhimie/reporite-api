import { HttpCode, AppError } from "../../../exceptions/appError";
import IProductRequestLogRepository from "../../../repositories/Request/prodRequestLog/prodRequestLogRepositories";
import { ProductRequestLog } from "../../../models/Request/ProdRequestLog.ts/prodRequestLog";
import { IProductRequestInterface } from "../../../interfaces/Request/ProdRequest/prodRequestInterface";
import { ProductRequest } from "../../../models/Request/ProdRequest.ts/prodRequest";
import { IProductRequestLogInterface } from "../../../interfaces/Request/ProdRequestLog/prodRequestLogInterface";
import { ApiFeatures } from "../../../utils/Feature";


export class ProductRequestLogRepository implements IProductRequestLogRepository {
    async makeOfferProductRequestLog(req: any): Promise<any> {
        try {
            const { productRequestId, quantity, vendorPrice, userId, shopId } = req.body;

            // find the product Request 
            const productRequest = await ProductRequest.findById(productRequestId);

            if (!productRequest) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'product Request is not Found'
                });
            }

            // Create a new product request log item
            const productRequestLogItem = new ProductRequestLog({
                productRequestId,
                quantity,
                vendorPrice,
                // ... other product request log fields
            });

            // Save the new product request log
            await productRequestLogItem.save();

            // Push the new product request log into the product request
            productRequest.productRequestLog.push(productRequestLogItem);

            // Save the updated product request
            await productRequest.save();

            // Return the created product request log item
            return productRequestLogItem;

        } catch (error) {
            console.error('Error creating Product Request Log:', error);
        }
    }

    async getAllProductRequestLog(req: any): Promise<any> {
        try {
            // const productRequests = await ProductRequest.find();

            const query = ProductRequestLog.find()
                .populate('productRequestId')
                .populate('userId')
                .populate('shopId')
                .exec();
            const resultPerPage: number = 10;

            const productRequestLogCount = await ProductRequestLog.countDocuments();

            const apiFeatures = new ApiFeatures(req.query, query)
                .search()
                .filter()
                .pagination(resultPerPage)

            const prodRequest = await apiFeatures?.query


            const productRequestLogData = {
                prodRequest,
                resultPerPage,
                productRequestLogCount
            }

            return productRequestLogData;

        } catch (error) {
            console.error('Error fetching product requests:', error);
        }

    }

    async getProductRequestLogId(req: any): Promise<any> {
        try {
            const productRequestLogId = req.params.productRequestLogId;
            const productRequestLog = await ProductRequestLog.findById(productRequestLogId)
                .populate('productRequestId')
                .populate('userId')
                .populate('shopId')
                .exec();


            if (!productRequestLog) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product is not found with this id'
                });
            }

            return productRequestLog;
        } catch (error) {
            console.error('Error fetching product request:', error);
        }
    }

    async updateProductRequestLog(req: any): Promise<any> {
        const { productRequestLogId, quantity, vendorPrice, userId } = req.body;

        try {
            // Find the product request log
            const productRequestLog = await ProductRequestLog.findById(productRequestLogId);

            if (!productRequestLog) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product Request Log not found'
                });
            }

            // Update the product request log fields
            productRequestLog.quantity = quantity;
            productRequestLog.vendorPrice = vendorPrice;

            // Save the updated product request log
            await productRequestLog.save();

            return productRequestLog;
        } catch (error) {
            console.error('Error updating product request log:', error);
            throw new AppError({
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                description: 'Internal Server Error'
            });
        }
    
    }

    async deleteProductRequestLog(req: any): Promise<any> {
        const { productRequestLogId } = req.params;
    
        try {
            // Find the product request log
            const productRequestLog = await ProductRequestLog.findById(productRequestLogId);
    
            if (!productRequestLog) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product Request Log not found'
                });
            }
    
            // Disassociate the product request from the product request log
            const productRequestId = productRequestLog.productRequestId;
    
            // Find the product request
            const productRequest = await ProductRequest.findById(productRequestId);
    
            if (!productRequest) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Product Request not found'
                });
            }
    
            // Remove the reference to the log in the product request
            const logIndex = productRequest.productRequestLog.findIndex(
                (log) => log.toString() === productRequestLogId.toString()
            );
    
            if (logIndex !== -1) {
                productRequest.productRequestLog.splice(logIndex, 1);
                await productRequest.save();
            }
    
            // Delete the product request log
            await productRequestLog.remove();
    
            return { message: 'Product Request Log deleted successfully' };
        } catch (error) {
            console.error('Error deleting product request log:', error);
            throw new AppError({
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                description: 'Internal Server Error'
            });
        }
    }
    
}
