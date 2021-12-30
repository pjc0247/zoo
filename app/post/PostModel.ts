import { Schema, Document, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { IUser } from '@/framework/model/user';

export interface IPost extends Document {
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
export const Post = model('Post', postSchema);
