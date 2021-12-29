import { Schema, model, Document } from 'mongoose';

import { ZooSchema } from './base';

export enum IdpType {
  Email = 'email',
  Facebook = 'facebook',
  Kakao = 'kakao',
  Google = 'google',
};
export interface IUser extends Document {
  name: string;

  idp: string;
  idpUserId: string;
  email: string;
  password: string;

  pushToken: string;
};

export const userSchema = ZooSchema({
  name: String,

  /* auth related properties */
  idp: {
    type: String,
    enum: Object.values(IdpType),
    required: true,
  },
  idpUserId: {
    type: String,
    index: { sparse: true, unique: true },
    required: false,
  },
  email: {
    type: String,
    index: { sparse: true, unique: true },
    required: false, /* email 안주는 로그인도 있음 */
  },
  password: String,

  /* push */
  pushToken: String,
});
export const User = model('User', userSchema);
