import { api, EmptyRequest, get, post, Request } from '@/framework/api';

import { ValueController } from './ValueController';

@api('/value')
export class Value {
  constructor(private value: ValueController) {}

  @get('/')
  async getValues(req: EmptyRequest) {
    const { platform } = req.params;

    const value = await this.value.getLatest(platform);

    return {
      value,
    };
  }
}
