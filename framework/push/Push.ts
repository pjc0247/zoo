import { Client } from 'onesignal-node';

import { ContentString } from '@/i18n';
import { PushOption } from './PushOption';
import { reinterpretSendAfter } from './optionParser';

const client = new Client('', '');

export class Push {
  static async send(
    title: ContentString,
    body: ContentString,
    id: string,
    option: PushOption = {}
  ) {
    await this._send(
      this._normalizeString(title),
      this._normalizeString(body),
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
        this._normalizeString(title),
        this._normalizeString(body),
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
      this._normalizeString(title),
      this._normalizeString(body),
      { filters: [{ field: 'tag', key: topic, relation: 'exists' }] },
      option
    );
  }

  private static _normalizeString(string: ContentString) {
    if (typeof string === 'string') {
      return { en: string };
    }
    return string;
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
