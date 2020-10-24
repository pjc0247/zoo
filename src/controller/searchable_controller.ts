import algoliasearch, { SearchIndex } from 'algoliasearch';
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
}
export default SearchableController;
