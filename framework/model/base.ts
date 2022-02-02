import { Schema, SchemaDefinition, SchemaOptions, Document } from 'mongoose';

import { BaseController } from '../controller';
import { ZooModel } from './ZooModel';
import { getDatabasehooks } from '../api';

export const ZooSchema = (
  definition: SchemaDefinition,
  options: SchemaOptions = {}
) => {
  const schema = new Schema(
    {
      ...definition,
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
      ...options,
    }
  );

  return schema;
};
