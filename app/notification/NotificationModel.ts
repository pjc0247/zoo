import { Schema, Document, model } from 'mongoose';

import { UserController } from '../user';

export interface INotification extends Document {
  title: string;
  body: string;

  receipent: UserController;
}
export const notificationSchema = new Schema({
  title: String,
  body: String,
  receipent: { type: Schema.Types.ObjectId, ref: 'User' },
});
export const Notification = model('Notification', notificationSchema);
