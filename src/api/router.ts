import deep_await from 'deep-await';
import {
  Router as ExpressRouter,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import passport from 'passport';
import env from 'env';
import { v4 as uuidv4 } from 'uuid';
import 'reflect-metadata';

import UserController from 'controller/user';
import { DevelopmentStage } from 'env/stage';
import { logRequest, logResponse } from 'log';
import specBuilder, { ResourceSpec } from './spec/builder';
import { Request } from './request';
import { getMiddlewares } from './decorator';

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

  get expressRouter() {
    return this.router;
  }

  activator<T>(type: { new(): T ;} ): T {
    return new type();
  }

  get<TParam>(path: string, handler: RequestHandler<TParam>) {
    this.builder.addApi(path, 'GET', {});
    this.router.get(path, (req, res, _handler) => this.wrapHandler(req, res, handler));
  }
  post<TParam>(path: string, handler: RequestHandler<TParam>) {
    this.builder.addApi(path, 'POST', {});
    this.router.post(path, (req, res) => this.wrapHandler(req, res, handler));
  }
  delete<TParam>(path: string, handler: RequestHandler<TParam>) {
    this.builder.addApi(path, 'DELETE', {});
    this.router.delete(path, (req, res, _handler) => this.wrapHandler(req, res, handler));
  }
  patch<TParam>(path: string, handler: RequestHandler<TParam>) {
    this.builder.addApi(path, 'PATCH', {});
    this.router.patch(path, (req, res, _handler) => this.wrapHandler(req, res, handler));
  }
  put<TParam>(path: string, handler: RequestHandler<TParam>) {
    this.builder.addApi(path, 'PUT', {});
    this.router.put(path, (req, res, _handler) => this.wrapHandler(req, res, handler));
  }

  private expressRequest2Request<TParam>(expressRequest: ExpressRequest): Request<TParam> {
    return {
      body: expressRequest.body as TParam,
      raw: expressRequest,
      user: expressRequest.user as UserController,
    };
  }
  private resolveMiddlewares(request: Request<any>, handler: Function): Function {
    let next = () => handler(request);
    const middlewares = getMiddlewares();
    for (const middleware of middlewares) {
      let _n = next;
      next = () => middleware.execute(request as any, _n);
    }
    return next;
  }
  private async wrapHandler<TParam>(req: ExpressRequest, res: ExpressResponse, handler: RequestHandler<TParam>) {
    try {
      const reqId = uuidv4();
      const request = this.expressRequest2Request(req);
      const userId = (<any>req.user)?.id;

      logRequest(reqId, userId, req);
      const task = this.resolveMiddlewares(request, handler);
      const response = await deep_await(task()) || {};
      res.header('X-REQ-ID', reqId);
      res.send(response);
      logResponse(reqId, userId, response);
    } catch (e) {
      // TODO: dev일때는 익셉션 스트링 다보내기
      if (env.stage === DevelopmentStage.Development)
        console.error(e);

      res.status(e.code || 500);
      res.send({
        message: e.toString(),
      });
    }
  }
}
export default Router;
