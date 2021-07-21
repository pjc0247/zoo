import { Request } from './request';

export interface IMiddleware {
  execute(request: Request<any>, response: Function): Promise<any>;
};
