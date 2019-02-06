import { Router } from 'express';
import method from './method';
import { callback } from './callback';

export default (model, map, ...rest) => {
  const router = Router({
    mergeParams: true,
  });
  
  Object.keys(map).forEach(key => {
    const cb = typeof rest[key] === 'function' ? rest[key] : callback;
    
    router[map[key]]('/', (req, res, next) => {
      try {
        method[key]({ req, res, next, cb, model, key });
      } catch(err) {
        next(err);
      }
    });
  });

  return router;
};
