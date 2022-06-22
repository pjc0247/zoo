import { api, get, post, Request } from '@/api';

import { NotificationController } from './NotificationController';

@api('/notification')
export class Notification {
  constructor(private notification: NotificationController) {}

  @get('/')
  async getNotifications() {
    return [];
  }
}
