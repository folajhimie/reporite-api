import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the  MaterialCategories Schema for TypeScript.
 * @param name:string
 * @param cost:number
 * @param created_by:Types.ObjectId
 */

// Define the  MaterialCategories schema
export interface MaterialCategoriesInterface {
  name: string;
  cost: number;
  created_by: Types.ObjectId;
}

