import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the WorkRequest Schema for TypeScript.
 * @param name:string;
 * @param code:string;
 * @param description:string;
 * @param created_by: Types.ObjectId;
 * @param file_id: Types.ObjectId;
 * @param work_request_log_id: Types.ObjectId;
 * @param material_id: Types.ObjectId;
 * @param job_statuses_id: Types.ObjectId;
 * @param organization_type_id: Types.ObjectId;
 * @param client_request_id: Types.ObjectId;
 */

// Define the WorkRequest Schema
export interface WorkRequestInterface {
  name: string;
  code: string;
  description: string;
  created_by: Types.ObjectId;
  file_id: Types.ObjectId;
  work_request_log_id: Types.ObjectId;
  material_id: Types.ObjectId;
  job_statuses_id: Types.ObjectId;
  organization_id: Types.ObjectId;
  client_request_id: Types.ObjectId;
}

