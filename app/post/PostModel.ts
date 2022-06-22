import { Document, Schema, model } from 'mongoose';
import MongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2';

import { ZooModel } from '@/model';
import { IUser } from '@/model/user';

export interface IPost extends ZooModel {
  title: string;
  body: string;

  author: IUser;
}
export const postSchema = new Schema({
  title: String,
  body: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});
postSchema.plugin(mongoosePaginate);
postSchema.plugin(MongooseDelete, { deletedAt: true });
export const Post = model('Post', postSchema);
