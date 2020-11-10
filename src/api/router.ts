import {
  Router as ExpressRouter,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import passport from 'passport';
import 'reflect-metadata';
import { keys } from 'ts-transformer-keys';

import specBuilder, { ResourceSpec } from './spec/builder';
import { Request } from './request';

type RequestHandler<TParam> = (req: Request<TParam>) => void;

class RouterOptions {
  useAuth?: boolean = false;
}
class Router {
  private router: ExpressRouter;
  private options: RouterOptions;

  private builder: ResourceSpec;

  constructor(private resource: string, options: RouterOptions = {}) {
    this.router = ExpressRouter();
    this.options = options;
    this.builder = specBuilder.addResource(resource);
    
    if (options.useAuth)
      this.router.use(passport.authenticate('jwt', { session: false }));
  }

  activator<T>(type: { new(): T ;} ): T {
    return new type();
  }

  get<TParam>(path: string, handler: RequestHandler<TParam>) {
    this.builder.addApi(path, 'GET', {});
    this.router.get(path, (req, res, handler) => this.wrapHandler(req, res, handler));
  }
  post<TParam>(type: TParam, path: string, handler: RequestHandler<TParam>) {
    const b = new (<any>type)();
    console.log(Object.getOwnPropertyNames(b));
    console.log(Reflect.getMetadataKeys(b));
    console.log(Reflect.getMetadata('design:type', b, 'foo'));
    console.log(keys(b));

    this.builder.addApi(path, 'POST', {});
    this.router.post(path, (req, res, handler) => this.wrapHandler(req, res, handler));
  }
  delete<TParam>(path: string, handler: RequestHandler<TParam>) {
    this.builder.addApi(path, 'DELETE', {});
    this.router.delete(path, (req, res, handler) => this.wrapHandler(req, res, handler));
  }
  patch<TParam>(path: string, handler: RequestHandler<TParam>) {
    this.builder.addApi(path, 'PATCH', {});
    this.router.patch(path, (req, res, handler) => this.wrapHandler(req, res, handler));
  }
  put<TParam>(path: string, handler: RequestHandler<TParam>) {
    this.builder.addApi(path, 'PUT', {});
    this.router.put(path, (req, res, handler) => this.wrapHandler(req, res, handler));
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
