import { Client } from 'onesignal-node';

import env from '../env';
import { ContentString } from '../i18n';
import { reinterpretSendAfter } from './optionParser';
import { PushOption } from './PushOption';

const client = new Client('', '');

export class Push {
  static async send(
    title: ContentString,
    body: ContentString,
    id: string,
    option: PushOption = {}
  ) {
    await this._send(
      {
        en: title,
      },
      {
        en: body,
      },
      { include_player_ids: [id] },
      option
    );
  }
  static async sendMany(
    title: ContentString,
    body: ContentString,
    ids: string[],
    option: PushOption = {}
  ) {
    for (let i = 0; i < ids.length; i++) {
      await this._send(
        {
          en: title,
        },
        {
          en: body,
        },
        { include_player_ids: ids.slice(i, i + 2000) },
        option
      );
    }
  }
  static async sendToTopic(
    title: ContentString,
    body: ContentString,
    topic: string,
    option: PushOption = {}
  ) {
    await this._send(
      {
        en: title,
      },
      {
        en: body,
      },
      { filters: [{ field: 'tag', key: topic, relation: 'exists' }] },
      option
    );
  }

  private static async _send(
    title: object,
    body: object,
    filterOrIds: object,
    option: PushOption
  ) {
    return await client.createNotification({
      headings: {
        ...title,
      },
      contents: {
        ...body,
      },
      ...filterOrIds,

      send_after: option.sendAfter && reinterpretSendAfter(option.sendAfter),
    });
  }
}
