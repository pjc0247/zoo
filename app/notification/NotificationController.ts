import { BaseController } from '@/framework/controller';
import { IUser } from '@/framework/model/user';

import { INotification, Notification } from './NotificationModel';

export class NotificationController extends BaseController<INotification> {
  static model = Notification;

  async createForUser(user: IUser, data: Partial<INotification>) {
    return await this.create({
      ...data,
      receipent: user.id,
    });
  }

  async onAfterSave() {
    this.doc.receipent.sendPush(this.doc.title, this.doc.body);
  }

  async toExportable() {
    return {
      id: this.id,
      title: this.doc.title,
      body: this.doc.body,
    };
  }
}
