import mongoose, { Document, Schema, Model, Types, model } from 'mongoose';
import { RequestInterface } from '../../interfaces/Request/requestInterface';

interface Request extends RequestInterface, Document {}


const requestSchema: Schema = new Schema<RequestInterface>({
  item_name: { type: String, required: true },
  item_specification: { type: String, required: true },
  item_image: { type: String, required: true },
  item_category: { type: String, required: true},
  item_code: { type: String, required: true },
  duration: { type: String, required: true },
  expiration_date: { type: String, required: true },
  request_item_id: { type: Schema.Types.ObjectId, ref: 'RequestItem', required: true },
  created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  organization_id: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
});

export const Request = model<Request>("Request", requestSchema);

