import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

import UserController from '../controller/user';

export class Request<TParams> {
  body: TParams;
  user: UserController;

  /* raw express request */
  raw: ExpressRequest;
};
export class EmptyRequest extends Request<{}> {

};
export interface Response extends ExpressResponse {

};
