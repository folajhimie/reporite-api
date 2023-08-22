import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the PaymentStatuses Schema for TypeScript.
 * @param name:string
 * @param cost:string
 */

// Define the PaymentStatuses schema
export interface PaymentStatusesInterface {
  name: string;
  code: string;
}

// pending 
// approved
// fully Paid
// partially paid 
// terminated
// in negotiation
