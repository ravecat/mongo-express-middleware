import createError from 'http-errors';
import express from 'express';
import config from './config';
import elements from './elements';
import { mongoMiddleware } from '../src';
import { Elements } from './model';

const app = express();

const customCallback = (req, res) => {
  res.status(200).send({
    customData: [],
  });
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/elements', elements());

// TODO Transfer middleware to test file after resolution https://github.com/chaijs/chai/issues/1283
app.use(
  '/custom',
  mongoMiddleware({
    model: Elements,
    read: customCallback,
    create: customCallback,
    readEntity: customCallback,
    update: customCallback,
    delete: customCallback,
  }),
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || config.errorStatus).send({
    status: err.status,
    error: err,
  });
});

export default app;
