import { Document } from 'mongoose';

import { ZooModel } from '../model';
import { BaseController } from './BaseController';

export const useController = <
  T extends BaseController<TDoc>,
  TDoc extends ZooModel
>(
  type: new (...args: any[]) => T
): Omit<T, 'update' | 'destroy' | 'batchDestroy' | 'toExportable' | 'id'> => {
  return new type();
};
