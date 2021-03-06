import cookieParser from 'cookie-parser';
import { NextFunction, Response } from 'express';
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import decodeJWT from './utils/decodeJWT';

class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        const { connection: { context = null } = {} } = req;
        return {
          req: req.request,
          context,
        };
      },
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(logger('dev'));
    this.app.express.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
      }),
    );
    this.app.express.use(cookieParser());
    this.app.express.use(this.jwt);
  };

  private jwt = async (req, res: Response, next: NextFunction): Promise<void> => {
    const authorization = req.cookies['Authorization'] || req.get('Authorization');
    const token = authorization ? authorization.split(' ')[1] : null;
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
