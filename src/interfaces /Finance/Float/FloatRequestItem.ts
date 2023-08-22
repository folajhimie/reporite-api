import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the FloatRequestItem Schema for TypeScript.
 * @param cost: string;
 * @param quantity: number;
 * @param description: string;
 * @param created_by: Types.ObjectId;
 * @param float_request_id: Types.ObjectId;
 * @param float_request_statuses_id: Types.ObjectId;
 */

// Define the FloatRequestItem Schema
export interface FloatRequestItemInterface {
  cost: string;
  quantity: number;
  description: string;
  created_by: Types.ObjectId;
  float_statuses_id: Types.ObjectId;
  float_request_id: Types.ObjectId;
}

