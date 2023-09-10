import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the Organization Schema for TypeScript.
 * @param name: string;
 * @param quantity: string;
 * @param cost: string;
 * @param description: string;
 * @param management_fee: string;
 * @param price_limit: string;
 * @param total: string;
 * @param request_id: Types.ObjectId;
 */

// Define the Organization Schema
export interface RequestItemInterface {
  name: string;
  quantity: string;
  cost: string;
  description: string;
  management_fee: string;
  price_limit: string;
  total: string;
  request_id: Types.ObjectId;
}

