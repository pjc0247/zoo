import { Schema, model, Document } from 'mongoose';

import { ZooSchema } from './base';

export interface IPost extends Document {
  title: string;
  body: string;
};

export const postSchema = ZooSchema({
  name: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
});
export const Post = model('Post', postSchema);
