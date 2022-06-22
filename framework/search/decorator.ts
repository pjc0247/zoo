import { SearchIndex } from 'algoliasearch';

import { algolia } from './index';

export const searchableField = () => {
  return (ctor: any, prop: string, descriptor: PropertyDescriptor) => {};
};

export const searchable = (indexName: string) => {
  return <T extends { new (...args: any[]): {} }>(ctor: T) => {
    const index = algolia.initIndex(indexName);
    return class extends ctor {
      protected index: SearchIndex;

      constructor(...args: any[]) {
        super(args[0], index);
        this.index = index;
      }
    };
  };
};
