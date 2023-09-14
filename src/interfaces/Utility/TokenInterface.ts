
export interface TokenInterface<T> {
    userId: T;
    token: string;
    vToken: string;
    loginToken: string;
    createdAt: Date;
    expiredAt: Date;
}

// import { Document, Model, Schema, model } from 'mongoose';

// export interface Entity {
//   id: string;
//   name: string;
// }

// export interface EntityDocument extends Entity, Document {}

// export interface EntityModel extends Model<EntityDocument> {}

// export function createEntitySchema<T extends Entity>(
//   entityName: string,
//   entitySchemaFields: Record<keyof T, any>
// ) {
//   const entitySchema = new Schema<EntityDocument, EntityModel>(
//     {
//       id: { type: String, required: true },
//       name: { type: String, required: true },
//       ...entitySchemaFields,
//     },
//     { timestamps: true }
//   );

//   return model<EntityDocument, EntityModel>(entityName, entitySchema);
// }
