import { SoftDeleteDocument } from 'mongoose-delete';

export interface ZooModel extends SoftDeleteDocument {
  createdAt: string;
  updatedAt: string;
}
