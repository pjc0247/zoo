import { Document } from 'mongoose';
import env from '../env';

import { User, userSchema, IdpType, IUser } from '../model/user';
import { Push } from '../push/Push';
import { DevelopmentStage } from '../env/stage';
import { DefaultPasswordEngine } from '../policy/password';
import { BaseController } from './BaseController';

class BaseUserController extends BaseController<IUser> {
  static model = User;
  static passwordEngine = new DefaultPasswordEngine();

  async createWithEmail(email: string, password: string) {
    const user = await User.create({
      idp: IdpType.Email,
      email,
      password: BaseUserController.passwordEngine.getHashedPassword(password),
    });
    return new BaseUserController(user);
  }
  async createWith3rdPartyIdp(idp: IdpType, idpUserId: string, email: string) {
    const user = await User.create({
      idp,
      idpUserId,
      email,
    });
    return new BaseUserController(user);
  }

  async verifyPassword(password: string) {
    return await BaseUserController.passwordEngine.verifyPassword(
      password,
      this.doc.password
    );
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
}
export default BaseUserController;
