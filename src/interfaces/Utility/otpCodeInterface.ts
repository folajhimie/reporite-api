import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IOtpCodeInterface {
    name: string;
    code : string;
}