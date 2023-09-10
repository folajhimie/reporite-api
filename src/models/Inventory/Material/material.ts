import mongoose, { Document, Schema, Model, Types, model } from 'mongoose';
import { MaterialInterface } from '../../../interfaces/Inventory/Material/MaterialInterface';

interface Material extends MaterialInterface, Document {}
// const userSchema: Schema = new Schema<UserInterface>(

const materialSchema: Schema = new Schema<MaterialInterface>({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  inventory_managed: { type: Boolean, required: true },
  stock: { type: Number, default: 0 },
  min_stock: { type: Number, default: 0 },
  max_stock: { type: Number, default: 50 },
  currency_id: { type: Schema.Types.ObjectId, ref: 'Currency', required: true },
  created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  organization_id: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
});

export const Material = model<Material>("Material", materialSchema);

