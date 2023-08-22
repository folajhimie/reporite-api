import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the WorkRequestLogs Schema for TypeScript.
 * @param work_request_id: Types.ObjectId;
 * @param created_by: Types.ObjectId;
 * @param comment_id: Types.ObjectId;
 * @param organization_id: Types.ObjectId;
 * @param job_statuses_id: Types.ObjectId;
 */

// Define the WorkRequestLogs Schema
export interface WorkRequestLogsInterface {
    work_request_id: Types.ObjectId;
    created_by: Types.ObjectId;
    comment_id: Types.ObjectId;
    organization_id: Types.ObjectId;
    job_statuses_id: Types.ObjectId;
}

