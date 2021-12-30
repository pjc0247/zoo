import { Schema, Document, model } from 'mongoose';

export interface IAppValue extends Document {
  latestVersion: string;
}
export const appValueSchema = new Schema({
  latestVersion: String,
});
export const Post = model('AppValue', appValueSchema);
