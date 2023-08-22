import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the FloatRequestLogs Schema for TypeScript.
 * @param created_by: Types.ObjectId;
 * @param organization_id: Types.ObjectId;
 * @param float_statuses_id: Types.ObjectId;
 * @param comment_id: Types.ObjectId;
 * @param float_request_id: Types.ObjectId;

 */

// Define the FloatRequestLogs Schema
export interface FloatRequestLogsInterface {
  created_by: Types.ObjectId;
  organization_id: Types.ObjectId;
  float_statuses_id: Types.ObjectId;
  comment_id: Types.ObjectId;
  float_request_id: Types.ObjectId;
}

