import { BaseController } from '@/framework/controller';

import { IAppValue } from './ValueModel';

export class ValueController extends BaseController<IAppValue> {
  async createSnapshot(data: IAppValue) {
    await this.create(data);
  }
}
