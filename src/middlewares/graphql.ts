import passport from 'passport';
import {Request, Response} from "express";
import {User} from "../entities";

const ExpressGraphQL = require('express-graphql');
import {RootQuery} from "../graphql";

export const GraphQLMiddleware = (async (req: Request, res: Response) => {
  const next = (user: User) => ExpressGraphQL({
    schema: RootQuery,
    graphiql: true,
    context: {
      user: user || null
    }
  })(req, res);
  try {
    const user = await passport.authenticate('bearer', {session: false})(req, res, next);
    next(user);
  } catch (e) {
    next(e)
  }
});
