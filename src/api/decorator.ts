import { getOrCreateRouter } from './express';

const resources: Record<any, any> = {};

const getResource = (cls: any) => {
  return resources[cls.constructor.name];
}

export const api = (resource: string) => {
  return (ctor: any, ...args: any) => {
    resources[ctor.name] = new (<any>ctor)();
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
}
export const post = (path: string) => {

};
export const patch = (path: string) => {

};
export const put = (path: string) => {

};
export const del = (path: string) => {

};
