import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * Interface to model the Cart Schema for TypeScript.
 * @param productName: string;
 * @param productPrice: number;
 * @param productImage: string;
 * @param quantity: number;
 * @param userId: string,
 * @param productId: number,
 * @param stock: number,
 */

export interface ICartInterface extends Document {
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
    userId: string;
    productId: string;
    Stock: number;
}


