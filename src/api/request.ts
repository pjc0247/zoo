import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

import UserController from 'controller/user';

export interface Request<TParams> extends ExpressRequest {
  body: TParams;

  user: UserController;
};
export interface EmptyRequest extends Request<{}> {

};

export interface Response extends ExpressResponse {

};
