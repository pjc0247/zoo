import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import env from 'env';

import { BaseController } from './base_controller';
import { User, userSchema, IdpType, IUser } from 'model/user';
import Push from 'thirdparty/push';
import { DevelopmentStage } from 'env/stage';

class UserController extends BaseController<IUser> {
  static model = User;

  static async createWithEmail(email: string, password: string) {
    let encryptedOrRawPassword = '';
    if (env.stage === DevelopmentStage.Development
      && env.useRawPasswordOnDevelopment) {
      encryptedOrRawPassword = password;
    } else {
      encryptedOrRawPassword = await bcrypt.hash(password, 10);
    }
    
    const user = await User.create({
      idp: IdpType.Email,
      email,
      password: encryptedOrRawPassword,
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

  get id() {
    return this.doc.id;
  }

  async verifyPassword(password: string) {
    if (env.stage === DevelopmentStage.Development
      && env.useRawPasswordOnDevelopment) {

      if (password === this.doc.password)
        return true;
    }

    if (await bcrypt.compare(password, this.doc.password))
      return true;
    return false;
  }

  async setPushToken(token: string) {
    await this.update({
      pushToken: token,
    });
  }
  sendPush(title: string, body: string) {
    if (!this.doc.pushToken) return false;
    Push.send(title, body, this.doc.pushToken);
    return true;
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
