import { Schema, model } from 'mongoose';

import { ZooModel } from '@/model';
import { ZooSchema } from '@/model/base';
import { IUser } from '@/model/user';
import { IPost } from './PostModel';

export interface IComment extends ZooModel {
  title: string;
  body: string;

  post: IPost;
  author: IUser;
}

export const commentSchema = ZooSchema({
  title: String,
  body: String,
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});
//export const Comment = model('Comment', commentSchema);
