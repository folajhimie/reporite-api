import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the FloatRequestStatuses Schema for TypeScript.
 * @param name: string;
 * @param code: string;
 */

// Define the FloatRequestStatuses Schema
export interface FloatRequestStatusesInterface {
    name: string;
    code: string;
}


// pending 
// approved
// closed
// terminated
