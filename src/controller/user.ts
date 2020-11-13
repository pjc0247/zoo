import { Document } from 'mongoose';

import BaseController from './base_controller';
import { User, userSchema, IdpType, IUser } from 'model/user';
import Push from 'thirdparty/push';

class UserController extends BaseController<IUser> {
  static model = User;

  static async createWithEmail(email: string, password: string) {
    const user = await User.create({
      idp: IdpType.Email,
      email,
      password,
    });
    return new UserController(user);
  }
  static async createWith3rdPartyIdp(idp: IdpType, idpUserId: string, email: string) {
    const user = await User.create({
      idp,
      idpUserId,
      email,
    });
    return new UserController(user);
  }

  verifyPassword(password: string) {
    // FIXME
    if (password === this.doc.password)
      return true;
    return false;
  }

  async setPushToken(token: string) {
    await this.update({
      pushToken: token,
    });
  }
  sendPush(title: string, body: string) {
    if (!this.doc.pushToken) return;
    Push.send(title, body, this.doc.pushToken);
  }

  async toExportable() {
    return {
      id: this.id,

      name: this.doc.name,

      /* auth */
      idp: this.doc.idp,
      email: this.doc.email,
    };
  }
};
export default UserController;
