import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// Define the Organization Schema
export interface IPersonnalInterface {
    businessOwner: string;
    businessOwnerType: {
        public_id: string;
        secure_url: string;
    };
    utilityBill: {
        public_id: string;
        secure_url: string;
    };
}

