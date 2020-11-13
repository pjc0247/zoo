import algoliasearch, { SearchIndex } from 'algoliasearch';
import { Document } from 'mongoose';

import { algolia } from 'search';
import BaseController from './base_controller';

class SearchableController<TDoc extends Document>
  extends BaseController<TDoc> {

  constructor(
    doc: Document,
    private index?: SearchIndex,
  ) {
    super(doc);

    if (!index)
      throw new Error(`Index not found. Did you add '@searchable()' to 'SearchableController'?`);
  }

  async create(object: Partial<TDoc>) {
    const obj = await super.create(object);
    await this.index.saveObject({
      objectID: obj.id,
      ...object,
    });
  }
  async destroy() {
    const ret = await super.destroy();
    await this.index.deleteObject(this.id);
    return ret;
  }
  async update(props: Partial<TDoc>) {
    const ret = await super.update(props);
    this.index.partialUpdateObject({
      objectID: this.doc.id,
      ...props,
    });
    return ret;
  }

  async search<T>(query: string, offset: number = 0, limit: number = 20) {
    const {
      hits,
    } = await this.index.search(query, {
      offset,
      length: limit,
    });

    return await Promise.all(hits.map(x => this.get(x.objectID)));
  }
}
export default SearchableController;
