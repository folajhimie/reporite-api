import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the FloatRequest Schema for TypeScript.
 * @param code:string;
 * @param description:string;
 * @param image:string;
 * @param active: boolean;
 * @param address: string;
 * @param organization_type_id: Types.ObjectId;
 */

// Define the FloatRequest Schema
export interface FloatRequestInterface {
  name: string;
  code: string;
  description: string;
  created_by: Types.ObjectId;
  organization_id: Types.ObjectId;
  float_statuses_id: Types.ObjectId;
}

