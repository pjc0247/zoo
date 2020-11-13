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

  async search<T>(query: string) {
    const {
      hits,
    } = await this.index.search(query);

    return await Promise.all(hits.map(x => this.get(x.objectID)));
  }
}
export default SearchableController;
