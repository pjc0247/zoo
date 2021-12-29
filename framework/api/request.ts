import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

import BaseUserController from '../controller/BaseUserController';

export class Request<TParams> {
  body: TParams;
  user: BaseUserController;
  params: Record<string, any>;

  /* raw express request */
  raw: ExpressRequest;
}
export class EmptyRequest extends Request<{}> {}
export interface Response extends ExpressResponse {}
