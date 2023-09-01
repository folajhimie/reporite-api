import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICategoryInterface extends Document {
  name: string;
}


