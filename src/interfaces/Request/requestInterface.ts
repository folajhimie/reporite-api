import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the Organization Schema for TypeScript.
 * @param item_name: string;
 * @param item_specification: string;
 * @param item_image: string;
 * @param item_category: string;
 * @param item_code: string;
 * @param duration: string;
 * @param expiration_date: string;
 * @param request_item_id: Types.ObjectId;
 * @param created_by: Types.ObjectId;
 * @param organization_id: Types.ObjectId;
 */

// Define the Organization Schema
export interface RequestInterface {
  item_name: string;
  item_specification: string;
  item_image: string;
  item_category: string;
  item_code: string;
  duration: string;
  expiration_date: string;
  created_by: Types.ObjectId;
  organization_id: Types.ObjectId;
  request_item_id: Types.ObjectId;
}

