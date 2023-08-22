
import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the InvoiceLogs Schema for TypeScript.
 * @param invoice_id:Types.ObjectId;
 * @param payment_statuses_id:Types.ObjectId;
 * @param created_by: Types.ObjectId;
 * @param comment_id: Types.ObjectId;
 */

// Define the InvoiceLogs Schema
export interface InvoiceLogsInterface {
  invoice_id: Types.ObjectId;
  payment_statuses_id: Types.ObjectId;
  created_by: Types.ObjectId;
  comment_id: Types.ObjectId;
}

