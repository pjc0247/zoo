import admin from 'firebase-admin';

const messaging = admin.messaging();

export class Push {
  static send(title: string, body: string, token: string) {
    messaging.send({
      notification: {
        title,
        body,
      },
      token,
    });
  }
  static sendToTopic(title: string, body: string, topic: string) {
    messaging.sendToTopic(topic, {
      notification: {
        title,
        body,
      },
    });
  }
}
