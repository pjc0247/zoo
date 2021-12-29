import { Schema, SchemaDefinition, SchemaOptions, Document } from 'mongoose';

export const ZooSchema = (definition: SchemaDefinition, options: SchemaOptions = {}) => {
  return new Schema({
    ...definition,
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    ...options,
  })
};
