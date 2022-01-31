import { Schema, Document, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import MongooseDelete from 'mongoose-delete';

import { IUser } from '@/framework/model/user';
import { ZooModel } from '@/framework/model';

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
