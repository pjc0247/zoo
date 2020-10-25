import algoliasearch, { SearchIndex } from 'algoliasearch';
import { Model } from 'mongoose';
import { Document } from 'mongoose';

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

  async search<T>(query: string) {
    const {
      hits,
    } = await this.index.search(query);

    return hits.map(x => new ((<any>this).constructor.get(x)));
  }
}
export default SearchableController;
