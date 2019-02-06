import { Router } from 'express';
import middleware from './middleware';

const mapList = { create:'post', read:'get' };
const mapEntity = { readEntity:'get', update:'put', delete:'delete' };

export const mongoMiddleware = ({ mergeParams = false, caseSensitive = false, strict = false, model, ...rest }) => {
  const router = Router({
    mergeParams,
    caseSensitive,
    strict
  });

  if (rest.middleware) router.use(rest.middleware);

  router.use('/', middleware(model, mapList, ...rest));
  router.use('/:id([a-zA-Z0-9]+)', middleware(model, mapEntity, ...rest));
  
  return router;
};
