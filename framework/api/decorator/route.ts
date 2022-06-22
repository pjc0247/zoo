import { model as compileModel } from 'mongoose';

import { BaseController } from '@/controller';
import { getOrCreateRouter } from '../express';
import { DatabaseHookKind, IDatabaseHook } from '../hook';
import { IMiddleware } from '../middleware';
import { IResource } from '../resource';
import { appendMetadata } from './metadata';

const resources: Record<any, IResource> = {};
const middlewares: Record<any, IMiddleware> = {};
const databaseHooks: Record<string, IDatabaseHook[]> = {};

const getResource = (cls: any) => {
  return resources[cls.constructor.name];
};
export const getResources = (): IResource[] => {
  return Object.values(resources);
};
export const getMiddlewares = (): IMiddleware[] => {
  return Object.values(middlewares);
};
export const getDatabasehooks = (controller: string): IDatabaseHook[] => {
  return databaseHooks[controller] || [];
};

export const controller = <T>(controllerName: string) => {
  return (ctor: new (...args: any[]) => T) => {
    const injections =
      Reflect.getMetadata('design:paramtypes', ctor)?.map(
        (x) => new (<any>x)()
      ) || [];
    const instance: BaseController<any> = new (<any>ctor)(...injections);
    // @ts-ignore
    instance.name = controllerName;

    ['preSave', 'postSave'].forEach((hookKind) => {
      const hooks = Reflect.getMetadata(hookKind, instance) as {
        method: string;
      }[];

      hooks?.forEach(({ method: hookMethod }) => {
        const hook: IDatabaseHook = {
          kind: hookKind as DatabaseHookKind,
          method: (doc) => {
            instance[hookMethod](doc);
          },
        };

        if (databaseHooks[controllerName]) {
          databaseHooks[controllerName].push(hook);
        } else {
          databaseHooks[controllerName] = [hook];
        }
      });
    });

    // @ts-ignore
    const schema = ctor.schema;
    const _hooks = getDatabasehooks(controllerName);
    _hooks.forEach((hook) => {
      if (hook.kind === 'postSave') {
        schema.post('save', hook.method);
      }
    });

    const model = compileModel(controllerName, schema);

    // @ts-ignore
    ctor.model = model;
  };
};

export const api = (path: string) => {
  return (ctor: any) => {
    const injections =
      Reflect.getMetadata('design:paramtypes', ctor)?.map(
        (x) => new (<any>x)()
      ) || [];
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
