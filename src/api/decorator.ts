import { getOrCreateRouter } from './express';
import { IMiddleware } from './middleware';

const resources: Record<any, any> = {};
const middlewares: Record<any, IMiddleware> = {};

const getResource = (cls: any) => {
  return resources[cls.constructor.name];
};
export const getMiddlewares = (): IMiddleware[] => {
  return Object.values(middlewares);
};

export const api = (resource: string) => {
  return (ctor: any, ...args: any) => {
    const injections = Reflect.getMetadata('design:paramtypes', ctor)
      .map(x => new (<any>x))
    resources[ctor.name] = new (<any>ctor)(injections);
  };
};
export const middleware = () => {
  return (ctor: any, ...args: any) => {
    middlewares[ctor.name] = new (<any>ctor)();
  };
};

export const get = (path: string) => {
  return (cls: any, method: any, desc: PropertyDescriptor) => {
    const router = getOrCreateRouter(cls);
    router.get(path, (res) => {
      const resource = getResource(cls);
      return resource[method](res);
    });
  };
};
export const post = (path: string) => {
  return (cls: any, method: any, desc: PropertyDescriptor) => {
    const router = getOrCreateRouter(cls);
    router.post(path, (res) => {
      const resource = getResource(cls);
      return resource[method](res);
    });
  };
};
export const patch = (path: string) => {

};
export const put = (path: string) => {

};
export const del = (path: string) => {

};
