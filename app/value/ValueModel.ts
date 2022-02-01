import { Schema, model } from 'mongoose';

import { ZooModel } from '@/framework/model';

export interface IAppValue extends ZooModel {
  raw: string;
  platform: string;
}
export const appValueSchema = new Schema({
  raw: {
    type: String,
    default: '{}',
  },
  platform: String,
});
export const Post = model('AppValue', appValueSchema);
