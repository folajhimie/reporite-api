import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the InvoiceItems Schema for TypeScript.
 * @param cost:number
 * @param amount:number
 * @param quantity:number
 * @param invoice_id:Types.ObjectId;
 * @param payment_statuses_id: Types.ObjectId;
 * @param created_by: Types.ObjectId;
 * @param material_id: Types.ObjectId;
 */

// Define the InvoiceItems schema
export interface InvoiceItemsInterface {
    cost: number;
    amount: number;
    quantity: number;
    invoice_id: Types.ObjectId;
    payment_statuses_id: Types.ObjectId;
    created_by: Types.ObjectId;
    material_id: Types.ObjectId;
}

