import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the WorkRequestItem Schema for TypeScript.
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

// Define the WorkRequestItem Schema
export interface WorkRequestItemInterface {
  quantity: number;
  created_by: Types.ObjectId;
  job_statuses_id: Types.ObjectId;
  work_request_id: Types.ObjectId;
  material_id: Types.ObjectId;
  material_cost_id: Types.ObjectId;
}

