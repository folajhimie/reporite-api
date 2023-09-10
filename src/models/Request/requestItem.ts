import mongoose, { Document, Schema, Model, Types, model } from 'mongoose';

import { RequestItemInterface } from '../../interfaces/Request/requestItemInterface';

interface RequestItem extends RequestItemInterface, Document {}
// const userSchema: Schema = new Schema<UserInterface>(

const requestItemSchema: Schema = new Schema<RequestItemInterface>({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  cost: { type: String, required: true },
  description: { type: String, required: true},
  management_fee: { type: String, required: true },
  price_limit: { type: String, required: true },
  total: { type: String, required: true },
  request_id: { type: Schema.Types.ObjectId, ref: 'Request', required: true },
});

export const RequestItem = model<RequestItem>("RequestItem", requestItemSchema);

