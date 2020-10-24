import { Document } from 'mongoose';

import { SearchableController } from 'controller/index';
import { algolia } from './index';

export const searchable = (indexName: string) => {
  return (ctor: any, ...args: any) => {
    const index = algolia.initIndex(indexName);
    return class extends SearchableController<Document> {
      constructor(doc: Document) {
        super(doc, index);
      }
    };
  };
}
