import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the Invoice Schema for TypeScript.
 * @param name:string
 * @param cost:string
 */

// Define the Invoice Schema
export interface InvoiceInterface {
  code: string;
  total: number;
  currency_id: Types.ObjectId;
  payment_statuses_id: Types.ObjectId;
  created_by: Types.ObjectId;
  organization_id: Types.ObjectId;
}

