import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the Organization Schema for TypeScript.
 * @param business_name: string;
 * @param business_phone: string;
 * @param business_email: string;
 * @param business_image: string;
 * @param active: boolean;
 * @param address: string;
 * @param created_by: Types.ObjectId;
 * @param organization_type_id: Types.ObjectId;
 */

// Define the Organization Schema
export interface OrganizationInterface {
  business_name: string;
  business_phone: string;
  business_email: string;
  business_image: string;
  active: boolean;
  address: string;
  created_by: Types.ObjectId;
  organization_type_id: Types.ObjectId;
}

