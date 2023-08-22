import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the InvoiceFloatTRequest Schema for TypeScript.
 * @param invoice_id:Types.ObjectId;
 * @param float_request_id:Types.ObjectId;
 */

// Define the InvoiceFloatTRequestSchema
export interface InvoiceFloatTRequest {
  invoice_id: Types.ObjectId;
  float_request_id: Types.ObjectId;
}

