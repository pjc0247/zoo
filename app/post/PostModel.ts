import { Schema, Document, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IPost extends Document {
  title: string;
  body: string;
};
export const postSchema = new Schema({
  title: String,
  body: String,
});
postSchema.plugin(mongoosePaginate);
export const Post = model('Post', postSchema);
