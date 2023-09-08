// import Product from "../models/Production/Product/product";
import { Product } from "../models/Production/Product/product";
import { Response, Request } from "express";
import Shop from "../models/Production/Shop/shop";
import { IShopInterface } from "../interfaces /Production/Shop/shopInterface";


export class Utility {

    // Helper function to check if the shop matches the user (customize as needed)
    shopMatchesUser(shop: any, user: any): boolean {
        // Implement your logic to check if the shop belongs to the user
        // You can compare shop.ownerId or similar fields with user._id
        return shop._id === user._id;
    }

    calculateTotalPrice(items: any[]): number {
        // Implement your logic to calculate the total price based on cart items
        // You can iterate through the items and sum their prices
        let totalPrice = 0;
        for (const item of items) {
            totalPrice += item.productPrice * item.quantity;
        }
        return totalPrice;
    }

    async updateOrder(order: any, statusToOrder: string): Promise<void> {
        try {
            const product = await Product.findById(order.productId);

            if (!product) {
                // Handle the case where the product is not found
                throw new Error('Product not found');
            }

            let productStock = product.stock || 0;
            let productSoldOut = product.sold_out || 0;

            if (statusToOrder === "Refund Success") {
                productStock += order.quantity;
                productSoldOut -= order.quantity;
    
                product.stock = productStock;
                product.sold_out = productSoldOut;
            }

            if (statusToOrder === "Transferred to delivery partner") {
                productStock -= order.quantity;
                productSoldOut += order.quantity;
    
                product.stock = productStock;
                product.sold_out = productSoldOut;

            }



            await product.save({ validateBeforeSave: false });
        } catch (error) {
            console.error('Error updating order:', error);
            // Handle the error as needed
            throw error; // You can re-throw the error or handle it here
        }
    }

    async updateSellerInfo(request: Request, amount: number): Promise<void> {
        try {
            const seller: IShopInterface | null = await Shop.findById(request.seller.id);

            if (seller) {
                seller.availableBalance = amount;
                await seller.save();
            } else {
                throw new Error('Seller not found');
            }
        } catch (error) {
            console.error('Error updating seller info:', error);
            throw error;
        }
    }

}





