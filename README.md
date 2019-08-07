Mongo CRUD middleware for [express](https://www.npmjs.com/package/express).

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, make sure that your application use [express](https://www.npmjs.com/package/express) and [mongoose](https://www.npmjs.com/package/mongoose).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install mongo-express-middleware
```

or [`yarn add` command](https://yarnpkg.com/lang/en/docs/cli/add/#toc-adding-dependencies):

```bash
$ yarn add mongo-express-middleware
```

## Using

`app.js`

```JS
import express from 'express';
import { mongoMiddleware } from 'mongo-express-middleware';

const app = express();

app.use('/api/path', mongoMiddleware(options: Object));
```

Current midlleware works with list path `<host>/api/path/` and entity path `<host>/api/path/:id([a-zA-Z0-9]+)`

Middleware options include multiple keys

```JS
{
  /*
    Model field set mongoose model.
    Required field.
  */
  model: Object,
  /*
    Fields specify the behavior of the middleware according express docs
    http://expressjs.com/en/api.html#express.router
  */
  mergeParams: boolean,
  strict: boolean,
  caseSensitive: boolean,
  /*
    Callback for handle returned data.

    * create, read methods work with entity list
    * readEntity, put, delete methods work with single entity

    Default callback

    function(req, res, next) {
      res.status(200).send(res.data);
    }
  */
  create: Function,
  read: Function,
  readEntity: Function,
  update: Function,
  delete: Function,
}
```

## Example

[Application](./app/app.js)

Run [tests](./app/__test__/app.test.js) using the command `yarn test`

## License

[MIT](LICENSE)
