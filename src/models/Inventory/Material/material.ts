import mongoose, { Document, Schema, Model, Types, model } from 'mongoose';
import { MaterialInterface } from '../../../interfaces /Inventory/Material/materialInterface';

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

















































// import { Model, DataTypes } from 'sequelize';
// import { CurrencyModel } from './currency'; // Import CurrencyModel
// import { UserModel } from './user'; // Import UserModel
// import { OrganizationModel } from './organization'; // Import OrganizationModel

// class MaterialModel extends Model {
//   public id!: number;
//   public name!: string;
//   public cost!: number;
//   public stock!: number;
//   public currencyId!: number;
//   public userId!: number;
//   public organizationId!: number;

//   // Relationships
//   public readonly currency?: CurrencyModel;
//   public readonly user?: UserModel;
//   public readonly organization?: OrganizationModel;
// }

// export const MaterialModel = (sequelize: Sequelize) => {
//   MaterialModel.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       cost: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//       },
//       stock: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//         defaultValue: 0,
//       },
//       currencyId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       organizationId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'Material',
//     }
//   );

//   // Define associations
//   MaterialModel.belongsTo(CurrencyModel, {
//     foreignKey: 'currencyId',
//     as: 'currency',
//   });

//   MaterialModel.belongsTo(UserModel, {
//     foreignKey: 'userId',
//     as: 'user',
//   });

//   MaterialModel.belongsTo(OrganizationModel, {
//     foreignKey: 'organizationId',
//     as: 'organization',
//   });

//   return MaterialModel;
// };
