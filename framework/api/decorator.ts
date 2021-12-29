import { getOrCreateRouter } from './express';
import { IMiddleware } from './middleware';
import { IResource } from './resource';

const resources: Record<any, IResource> = {};
const middlewares: Record<any, IMiddleware> = {};

const getResource = (cls: any) => {
  return resources[cls.constructor.name];
};
export const getResources = (): IResource[] => {
  return Object.values(resources);
};
export const getMiddlewares = (): IMiddleware[] => {
  return Object.values(middlewares);
};

export const api = (path: string) => {
  return (ctor: any) => {
    const injections = Reflect.getMetadata('design:paramtypes', ctor).map(
      (x) => new (<any>x)()
    );
    const instance = new (<any>ctor)(...injections);
    resources[ctor.name] = {
      name: ctor.name,
      path,
      instance,
    };
    instance.name = ctor.name;

    const router = getOrCreateRouter(ctor.name);
    ['get', 'post', 'patch', 'put', 'delete'].forEach((httpMethod) => {
      const handlers = Reflect.getMetadata(httpMethod, instance) as {
        method: string;
        path: string;
      }[];

      handlers?.forEach(({ method: handlerMethod, path }) => {
        router[httpMethod](path, (res) => {
          return instance[handlerMethod](res);
        });
      });
    });
  };
};
export const middleware = () => {
  return (ctor: any) => {
    middlewares[ctor.name] = new (<any>ctor)();
  };
};

const appendMetadata = (key: string, target: any, value: any) => {
  const perv = Reflect.getMetadata(key, target) || [];
  Reflect.defineMetadata(key, [...perv, value], target);
};
export const get = (path: string) => {
  return (cls: any, method: any, desc: PropertyDescriptor) => {
    appendMetadata('get', cls, { method, path });
  };
};
export const post = (path: string) => {
  return (cls: any, method: any, desc: PropertyDescriptor) => {
    appendMetadata('post', cls, { method, path });
  };
};
export const patch = (path: string) => {
  return (cls: any, method: any, desc: PropertyDescriptor) => {
    appendMetadata('patch', cls, { method, path });
  };
};
export const put = (path: string) => {
  return (cls: any, method: any, desc: PropertyDescriptor) => {
    appendMetadata('put', cls, { method, path });
  };
};
export const del = (path: string) => {
  return (cls: any, method: any, desc: PropertyDescriptor) => {
    appendMetadata('delete', cls, { method, path });
  };
};
