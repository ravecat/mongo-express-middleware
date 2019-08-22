import { mongoMiddleware } from '../src';
import { Elements } from './model';

import { Router } from 'express';

export default function elements() {
  const router = Router();

  router.use(
    '/',
    mongoMiddleware({
      model: Elements,
    }),
  );

  return router;
}
