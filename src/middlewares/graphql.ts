import passport from 'passport';
import { Request, Response } from "express";
import { User } from "../entities";

const ExpressGraphQL = require('express-graphql');
import { RootQuery } from "../graphql";

export const GraphQLMiddleware = ((req: Request, res: Response) => {
  const next = (user: User) => ExpressGraphQL({
    schema: RootQuery,
    graphiql: true,
    context: {
      user: user || null
    }
  })(req, res);

  // check Authorization header
  if (
    !req.headers['authorization'] ||
    req.headers['authorization'].indexOf('Bearer') < 0
  ) {
    return res.sendStatus(401)
  }

  passport.authenticate(
    'bearer',
    { session: false },
    (err: Error, user: User, info: any) => {
      if (err) {
        if (err.message === 'Unauthorized') {
          return res.sendStatus(401)
        }
        return res.send(err)
      }

      next(user)
    }
  )(req, res, next)
});
