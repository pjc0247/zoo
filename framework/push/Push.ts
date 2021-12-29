import { Client } from 'onesignal-node';

import env from '../env';

const client = new Client('', '');

export class Push {
  static async send(title: string, body: string, id: string) {
    await client.createNotification({
      headings: {
        en: title,
      },
      contents: {
        en: body,
      },
      include_player_ids: [id],
    });
  }
  static async sendMany(title: string, body: string, ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
      await client.createNotification({
        headings: {
          en: title,
        },
        contents: {
          en: body,
        },
        include_player_ids: ids.slice(i, i + 2000),
      });
    }
  }
  static async sendToTopic(title: string, body: string, topic: string) {
    await client.createNotification({
      headings: {
        en: title,
      },
      contents: {
        en: body,
      },
      filters: [{ field: 'tag', key: topic, relation: 'exists' }],
    });
  }
}
