import { Schema, Document, model } from 'mongoose';

import { ZooModel } from '@/framework/model';
import { IUser } from '@/framework/model/user';
import { IPost } from './PostModel';

export interface IComment extends ZooModel {
  title: string;
  body: string;

  post: IPost;
  author: IUser;
}
export const commentSchema = new Schema({
  title: String,
  body: String,
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});
export const Comment = model('Comment', commentSchema);
