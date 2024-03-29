import algoliasearch, { SearchIndex } from 'algoliasearch';
import { Document } from 'mongoose';

import { ZooModel } from '../model';
import { InlineTask } from '../task';
import { BaseController } from './BaseController';

export class SearchableController<
  TDoc extends ZooModel
> extends BaseController<TDoc> {
  protected index: SearchIndex;

  async create(object: Partial<TDoc>): Promise<this> {
    const obj = await super.create(object);

    InlineTask.runRetriableTask(async () => {
      await this.index.saveObject({
        objectID: obj.id,
        ...object,
      });
    });

    return obj;
  }
  async destroy() {
    const ret = await super.destroy();

    InlineTask.runRetriableTask(async () => {
      await this.index.deleteObject(this.id);
    });

    return ret;
  }
  async update(props: Partial<TDoc>) {
    const ret = await super.update(props);

    InlineTask.runRetriableTask(async () => {
      await this.index.partialUpdateObject({
        objectID: this.doc.id,
        ...props,
      });
    });

    return ret;
  }

  async search(
    query: string,
    offset: number = 0,
    limit: number = 20
  ): Promise<this[]> {
    const { hits } = await this.index.search(query, {
      offset,
      length: limit,
    });

    return await this.getMany(hits.map((x) => x.objectID));
  }
}
