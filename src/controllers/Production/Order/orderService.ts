import IOrderRepository from "../../../repositories/Production/Order/orderRepositories";
import { IOrderInterface, IOrderItemInterface, IShippingAddress, IPaymentInfo } from "../../../interfaces /Production/Order/orderInterface";
import { OrderItem, Order } from "../../../models/Production/Order/order";
import { HttpCode, AppError } from "../../../exceptions/appError";
import Shop from "../../../models/Production/Shop/shop";
import { Utility } from "../../../Helpers/Utility";
import { Cart } from "../../../models/Production/Cart/cart";
// import { Request } from "../../../models/Request/request";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

// Import your Shop model

export class OrderRepository implements IOrderRepository {
    async createOrder(req: Request): Promise<void> {
        try {
            const { orderItemData, shippingAddress, createdBy, paymentInfo } = req.body;

            // Calculate the total price for the order
            let totalPriceForOrder = 0;

            for (const itemData of orderItemData) {
                const { productPrice, quantity } = itemData;

                // Calculate the total price for this order item
                const itemTotalPrice = parseFloat(productPrice) * parseInt(quantity);

                // Add the item's total price to the order's total price
                totalPriceForOrder += itemTotalPrice;
            }

            // Create the order first
            const order = new Order({
                orderItems: [], // Initialize with an empty array, we'll add order items later
                shippingAddress: shippingAddress as IShippingAddress, // Cast to the correct type
                createdBy,
                totalPrice: totalPriceForOrder,
                paymentInfo: paymentInfo as IPaymentInfo, // Cast to the correct type
            });

            // Save the order
            const savedOrder = await order.save();

            // Create order items using the saved order's ID
            const orderItems: IOrderItemInterface[] = [];

            for (const itemData of orderItemData) {
                const { productName, productPrice, quantity, productImage } = itemData;

                // Create an order item
                const orderItemInfo = new OrderItem({
                    productName,
                    productPrice: parseFloat(productPrice),
                    quantity: parseInt(quantity),
                    productImage,
                    orderId: savedOrder._id, // Associate order item with the saved order
                });

                // Save the order item
                const savedOrderItem = await orderItemInfo.save();

                // Add the saved order item to the order items array
                orderItems.push(savedOrderItem);

                // Update the order's orderItems field with the array of ObjectId
                savedOrder.orderItems = orderItems;
            }

            // Save the order with the updated orderItems
            await savedOrder.save();


        } catch (error) {
            console.error('Error creating order:', error);
        }
    };


    // async createOrder(
    //     request: Request
    // ): Promise<any> {
    //     try {
    //         const { shippingAddress, createdBy, paymentInfo, status } = request.body
    //         const { userId } = request.params

    //         // Find the user's cart or create one if it doesn't exist
    //         let order: IOrderInterface | null = await Order.findOne({ 'createdBy': userId });

    //         if (!order) {
    //             throw new AppError({
    //                 httpCode: HttpCode.NOT_FOUND,
    //                 description: 'order is not Found'
    //             });
    //         }

    //         // cart = new Cart({ userId, items: [] });


    //         // const { shippingAddress, createdBy, paymentInfo, status } = orderData;
    //         let orderItem: IOrderItemInterface[]  = orderItemData.map((item) => ({
    //             productName: item.productName,
    //             productPrice: item.productPrice,
    //             quantity: item.quantity,
    //             productImage: item.productImage,
    //             productId: item.productId,
    //             shopId: item.shopId
    //         }));

    //         // Group cart items by shopId
    //         const shopItemsMap = new Map<string, IOrderItem[]>();

    //         for (const item of cart) {
    //             const shopId = item.shopId;

    //             // Check if the shop exists and matches the provided ID
    //             const shop = await Shop.findById(shopId);
    //             if (!shop) {
    //                 throw new AppError({
    //                     httpCode: HttpCode.NOT_FOUND,
    //                     description: 'Shop not found with this ID'
    //                 });
    //             }

    //             const shopTop = new Utility();
    //             let shopData = shopTop.shopMatchesUser(shop, createdBy)

    //             if (!shopData) {
    //                 throw new AppError({
    //                     httpCode: HttpCode.FORBIDDEN,
    //                     description: 'Shop does not match the user'
    //                 });
    //             }

    //             if (!shopItemsMap.has(shopId)) {
    //                 shopItemsMap.set(shopId, []);
    //             }

    //             shopItemsMap.get(shopId)?.push(item);
    //         }

    //         // Create an order for each shop
    //         const orders: IOrderInterface[] = [];

    //         for (const [shopId, items] of shopItemsMap) {
    //             const totalShopPrice = new Utility();
    //             let totalData = totalShopPrice.calculateTotalPrice(items)
    //             const totalPrice = totalData; // Implement your own logic for calculating total price
    //             const order = {
    //                 createdBy,
    //                 cart: items,
    //                 shippingAddress: shippingAddress as IShippingAddress, // Cast to the correct type
    //                 paymentInfo: paymentInfo as IPaymentInfo, // Cast to the correct type
    //                 totalPrice,
    //                 // Add other fields as needed
    //             };

    //             const createdOrder = await Order.create(order);
    //             orders.push(createdOrder);
    //         }

    //         return orders;

    //     } catch (error) {
    //         console.error("Error creating Error:", error);
    //     }
    // }

    async getSingleOrder(reqParamsId: any): Promise<any> {
        try {
            const orders = await Order.find({ "_id": reqParamsId }).sort({ createdAt: -1 });

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
                const statusToOrder: string = 'Transferred to delivery partner';

                // Iterate through each order item and update the product stock
                for (const orderItem of orders.orderItems) {
                    try {
                        // Call the updateOrder function to deduct from the product stock
                        await orderInfo.updateOrder(orderItem, statusToOrder);
                    } catch (error) {
                        console.error('Error updating product stock:', error);
                        // Handle the error as needed
                    }
                }
            }
            orders.status = status

            if (status === "Delivered") {
                orders.deliveredAt = new Date();
                orders.paymentInfo.status = "Succeeded";

                const serviceCharge = orders.totalPrice * .10;

                let amountToUpdate = orders.totalPrice - serviceCharge

                await orderInfo.updateSellerInfo(req, amountToUpdate)
            }


            await orders.save({ validateBeforeSave: false })

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

            await order.save({ validateBeforeSave: false })

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
                const statusToOrder: string = 'Transferred to delivery partner';

                // Iterate through each order item and update the product stock
                for (const orderItem of order.orderItems) {
                    try {
                        // Call the updateOrder function to deduct from the product stock
                        await orderInfo.updateOrder(orderItem, statusToOrder);
                    } catch (error) {
                        console.error('Error updating product stock:', error);
                        // Handle the error as needed
                    }
                }
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








