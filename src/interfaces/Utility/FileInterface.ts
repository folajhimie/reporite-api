import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the File Schema for TypeScript.
 * @param file_path:string;
 * @param file_type:string;
 * @param client_name:string;
 * @param created_by:Types.ObjectId;
 */

// Define the File Schema
export interface FileInterface {
  file_path: string;
  file_type: string;
  client_name: string;
  created_by: Types.ObjectId;
}

