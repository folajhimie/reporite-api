import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// Define the Organization Schema
export interface IPersonnalInterface {
    businessVerificationType: string;
    businessVerificationNumber: string;
    businessVerificationImage: {
        public_id: string;
        secure_url: string;
    };
    businessUtilityBill: {
        public_id: string;
        secure_url: string;
    };
}

