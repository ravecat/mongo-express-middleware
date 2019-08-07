import createError from 'http-errors';
import express from 'express';
import config from './config';
import elements from './elements';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/elements', elements());

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
