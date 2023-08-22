import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the Organization Schema for TypeScript.
 * @param code:string;
 * @param description:string;
 * @param image:string;
 * @param active: boolean;
 * @param address: string;
 * @param organization_type_id: Types.ObjectId;
 */

// Define the Organization Schema
export interface OrganizationInterface {
  code: string;
  description: string;
  image: string;
  active: boolean;
  address: string;
  organization_type_id: Types.ObjectId;
}

