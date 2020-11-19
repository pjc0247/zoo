import { getOrCreateRouter } from './express';

const resources: Record<any, any> = {};

export const api = (resource: string) => {
  return (ctor: any, ...args: any) => {

    console.log(ctor);
    console.log(args);
    const a = new (<any>ctor)();
    console.log(a);

    resources[ctor.name] = new (<any>ctor)();
  };
};

export const get = (path: string) => {
  return (cls: any, method: any, desc: PropertyDescriptor) => {
    console.log(cls);
    const router = getOrCreateRouter(cls);
    //const inst = new (<any>cls)();
    console.log('name', cls.constructor.name);
    router.get(path, (res) => {
      const resource = resources[cls.constructor.name];
      console.log(resource);
      console.log('b', resource[method]);
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
