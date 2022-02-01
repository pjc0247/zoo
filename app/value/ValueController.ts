import { BaseController } from '@/framework/controller';

import { IAppValue } from './ValueModel';

export class ValueController extends BaseController<IAppValue> {
  async createSnapshot(data: IAppValue) {
    await this.create(data);
  }

  async getLatest(platform: string) {
    const snapshot = await this.query()
      .where({
        platform,
      })
      .sort({
        updatedAt: 'desc',
      })
      .findOne();

    return this.create(snapshot);
  }
}
