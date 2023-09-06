import IOrderRepository from "../../../repositories/Production/Order/orderRepositories";
import { IOrderInterface, IOrderItem, IShippingAddress, IPaymentInfo } from "../../../interfaces /Production/Order/orderInterface";
import Order from "../../../models/Production/Order/order";
import { HttpCode, AppError } from "../../../exceptions/appError";
import Shop from "../../../models/Production/Shop/shop";
import { Utility } from "../../../Helpers/Utility";
import Cart from "../../../models/Production/Cart/cart";
// import { Request } from "../../../models/Request/request";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

// Import your Shop model

export class OrderRepository implements IOrderRepository {
    async createOrder(
        orderData: Partial<IOrderInterface>,
        cartData: Partial<IOrderItem>[]
    ): Promise<any> {
        try {
            const { shippingAddress, createdBy, paymentInfo } = orderData;
            let cart: IOrderItem[]  = cartData.map((item) => ({
                productName: item.productName,
                productPrice: item.productPrice,
                quantity: item.quantity,
                productImage: item.productImage,
                productId: item.productId,
                shopId: item.shopId
            }));
    
            // Group cart items by shopId
            const shopItemsMap = new Map<string, IOrderItem[]>();
    
            for (const item of cart) {
                const shopId = item.shopId;
    
                // Check if the shop exists and matches the provided ID
                const shop = await Shop.findById(shopId);
                if (!shop) {
                    throw new AppError({
                        httpCode: HttpCode.NOT_FOUND,
                        description: 'Shop not found with this ID'
                    });
                }
    
                const shopTop = new Utility();
                let shopData = shopTop.shopMatchesUser(shop, createdBy)
    
                if (!shopData) {
                    throw new AppError({
                        httpCode: HttpCode.FORBIDDEN,
                        description: 'Shop does not match the user'
                    });
                }
    
                if (!shopItemsMap.has(shopId)) {
                    shopItemsMap.set(shopId, []);
                }
    
                shopItemsMap.get(shopId)?.push(item);
            }
    
            // Create an order for each shop
            const orders: IOrderInterface[] = [];
    
            for (const [shopId, items] of shopItemsMap) {
                const totalShopPrice = new Utility();
                let totalData = totalShopPrice.calculateTotalPrice(items)
                const totalPrice = totalData; // Implement your own logic for calculating total price
                const order = {
                    createdBy,
                    cart: items,
                    shippingAddress: shippingAddress as IShippingAddress, // Cast to the correct type
                    paymentInfo: paymentInfo as IPaymentInfo, // Cast to the correct type
                    totalPrice,
                    // Add other fields as needed
                };
    
                const createdOrder = await Order.create(order);
                orders.push(createdOrder);
            }
    
            return orders;
            
        } catch (error) {
            console.error("Error creating Error:", error);
        }
    }

    async getSingleOrder(reqParamsId: any): Promise<any> {
        try {
            const orders = await Order.find({ "userId._id": reqParamsId }).sort({ createdAt: -1 });

            return orders;
            
        } catch (error) {
            console.error("Error getting Error:", error);
        }
    }

    async getSellerAllOrders(reqParamsId: any): Promise<any> {
        try {
            const orders = await Order.find({ "cart.shopId": reqParamsId }).sort({ createdAt: -1 });

            return orders;
            
        } catch (error) {
            console.error("Error getting Error:", error);
        }
    }

    async updateOrderStatus(req: Request, orderData: IOrderInterface): Promise<any> {
        let { status } = orderData;
        const orderInfo = new Utility();

        try {
            const orders = await Order.findById(req.params.id);

            if (!orders) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: "Order not found with this id"
                });
            }

            if (status === "Transferred to delivery partner") {
                const statusToOrder: string =  'Transferred to delivery partner';
                // USING THE CART ORDER TO DEDUCT FROM THE PRODUCT STOCK
                orders.cart.forEach( async (order) => {
                        // const orderInfo = new Utility();
                        await orderInfo.updateOrder(order._id, order.quantity, statusToOrder)
                    }
                )
            }
            orders.status = status

            if (status === "Delivered") {
                orders.deliveredAt = new Date();
                orders.paymentInfo.status = "Succeeded";

                const serviceCharge = orders.totalPrice * .10;

                let amountToUpdate = orders.totalPrice - serviceCharge

                await orderInfo.updateSellerInfo(req, amountToUpdate)
            }


            await orders.save({ validateBeforeSave: false})

            return orders;
            
        } catch (error) {
            console.error("Error updating Error:", error);
        }
    }

    async orderRefund(req: Request): Promise<any> {
        try {
            const order = await Order.findById(req.params.id)

            if (!order) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: "Order not found with this id"
                });
            }

            order.status = req.body.status

            await order.save({ validateBeforeSave: false})

            return order
            
        } catch (error) {
            console.error("Error in order refund:", error);
        }
    }

    async orderRefundSuccess(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<any> {
        try {

            const order = await Order.findById(req.params.id);
            const orderInfo = new Utility();

            if (!order) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: "Order not found with this id"
                });
            }

            order.status = req.body.status;
            
            await order.save();

            if (req.body.status === "Refund Success") {
                const statusToOrder: string =  'Refund Success';
                // USING THE CART ORDER TO DEDUCT FROM THE PRODUCT STOCK
                order.cart.forEach( async (order) => {
                        // const orderInfo = new Utility();
                        await orderInfo.updateOrder(order._id, order.quantity, statusToOrder)
                    }
                )
            }

            return order
            
        } catch (error) {
            console.error("Error in order refund successfully:", error);
        }
    }

    async adminAllOrders(): Promise<any> {
        try {
            const orders = await Order.find().sort({
                createdAt: -1,
                deliveredAt: -1
            })

            if (!orders) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: "Order not found with this id"
                });
            }

            return orders
            
        } catch (error) {
            console.error("Error in getting all the order for admin:", error);
        }
    }


}








