import { Schema, model } from 'mongoose';

import { ZooModel } from '@/framework/model';
import { UserController } from '../user';

export interface INotification extends ZooModel {
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
