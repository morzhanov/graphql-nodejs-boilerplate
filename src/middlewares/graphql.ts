import passport from 'passport';
import {Request, Response} from "express";
import {User} from "../entities";

const ExpressGraphQL = require('express-graphql');
import {RootQuery} from "../graphql";

export const GraphQLMiddleware = ((req: Request, res: Response) => {
  return new Promise(() => {
    const next = (user: User) => ExpressGraphQL({
      schema: RootQuery,
      graphiql: true,
      context: {
        user: user || null,
      }
    });
    passport.authenticate('bearer', {session: false}, (err, user) => {
      next(user);
    })(req, res, next);
  });
});
