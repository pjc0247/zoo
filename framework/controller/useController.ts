import { Document } from 'mongoose';

import { BaseController } from './BaseController';

export const useController = <
  T extends BaseController<TDoc>,
  TDoc extends Document
>(
  type: new (...args: any[]) => Omit<
    T,
    'update' | 'destroy' | 'batchDestroy' | 'toExportable' | 'id'
  >
) => {
  return new type();
};
