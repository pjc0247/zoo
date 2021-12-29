import { Application } from 'express';

import { getResources } from './decorator';
import Router from './router';

const routers: Record<string, Router> = {};

export const getOrCreateRouter = (name: string) => {
  if (!routers[name]) {
    routers[name] = new Router(name);
  }
  return routers[name];
};
export const applyRouters = (app: Application) => {
  console.log(routers);
  for (const resource of getResources()) {
    console.log('a', resource);
    console.log('b', getOrCreateRouter(resource.name));
    app.use(resource.path, getOrCreateRouter(resource.name).expressRouter);
  }
};
