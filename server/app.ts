import * as cors from 'cors';
import * as express from 'express';
import { urlencoded, json } from 'body-parser';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as sassMiddleware from 'node-sass-middleware';

import * as index from './routes/index';
import * as users from './routes/users';

class ExpressServer {

  constructor(
    public _app = express(),
    public _PORT: number = process.env.PORT || 3000) {
    this.setViewEngine().setMiddleWare().setRoutes()
  }

  private setViewEngine(): this {
    this._app.set('view', path.join(__dirname, 'views'));
    this._app.set('view engine', 'pug');
    return this;
  }

  private setMiddleWare(): this {
    this._app.use(cors())
      .use(json())
      .use(urlencoded({ extended: false }))
      .use(cookieParser)
      .use(sassMiddleware({
        src: path.join(__dirname, "public"),
        dest: path.join(__dirname, "public"),
        indentedSyntax: false, // true = .sass and false = .scss
        sourceMap: true
      }))
      .use(express.static(path.join(__dirname, "public")))

    return this;
  }

  private setRoutes(): this {
    this._app.use('/', index)
    this._app.use('/users', users)
    return this;
  }

  startServer = () => {
    this._app.listen(this._PORT, () => {
      console.log(`Express server listening on port ${this._PORT}`)
    })
  }
}

const app = new ExpressServer()

module.exports = app._app;
