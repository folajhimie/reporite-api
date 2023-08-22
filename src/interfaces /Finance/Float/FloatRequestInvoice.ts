

import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the FloatRequestInvoice Schema for TypeScript.
 * @param invoice_id: Types.ObjectId;
 * @param float_request_id: Types.ObjectId;
 */

// Define the FloatRequestInvoice Schema
export interface FloatRequestInvoiceInterface {
  invoice_id: Types.ObjectId;
  float_request_id: Types.ObjectId;
}

