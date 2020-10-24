import {
  Router as ExpressRouter,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import passport from 'passport';

import { Request } from './request';

type RequestHandler<TParam> = (req: Request<TParam>) => void;

class RouterOptions {
  useAuth?: boolean = false;
}
class Router {
  private router: ExpressRouter;
  private options: RouterOptions;

  constructor(private resource: string, options: RouterOptions) {
    this.router = ExpressRouter();
    this.options = options;
    
    if (options.useAuth)
      this.router.use(passport.authenticate('jwt', { session: false }));
  }

  get<TParam>(path: string, handler: RequestHandler<TParam>) {
    this.router.get(path, )
  }

  private async wrapHandler<TParam>(req: ExpressRequest, res: ExpressResponse, handler: RequestHandler<TParam>) {
    try {
      const response = await handler(null);
      res.send(response);
    } catch (e) {
      res.send({
        exception: e.toString(),
      });
    }
  }
}
export default Router;
