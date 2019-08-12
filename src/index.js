import express from 'express';
import middleware from './middleware';

const mapList = { create: 'post', read: 'get' };
const mapEntity = { readEntity: 'get', update: 'put', delete: 'delete' };

export const mongoMiddleware = ({
  mergeParams = false,
  caseSensitive = false,
  strict = false,
  model,
  ...rest
}) => {
  const router = express.Router({
    mergeParams,
    caseSensitive,
    strict,
  });

  if (rest.middleware) router.use(rest.middleware);

  router.use('/', middleware({ model, map: mapList, ...rest }));
  router.use('/:id([a-zA-Z0-9]+)', middleware({ model, map: mapEntity, ...rest }));

  return router;
};
