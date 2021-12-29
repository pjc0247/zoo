import { Application } from 'express';
import Router from './router';

const routers: Record<string, Router> = {};

export const getOrCreateRouter = (cls: any) => {
  if (!routers[cls]) {
    routers[cls] = new Router('user');
  }
  return routers[cls];
};
export const applyRouters = (app: Application) => {
  console.log(routers);
  for (const key of Object.keys(routers))
    app.use('/user', routers[key].expressRouter);
};
