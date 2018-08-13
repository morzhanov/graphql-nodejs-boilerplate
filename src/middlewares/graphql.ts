import passport from "passport";
import { Request, Response } from "express";
import { User } from "../entities";

const ExpressGraphQL = require("express-graphql");
import { RootQuery } from "../graphql";

export const GraphQLMiddleware = (req: Request, res: Response) => {
  // TODO use this middleware only for non /auth requests
  const next = (user: User) =>
    ExpressGraphQL({
      schema: RootQuery,
      graphiql: true,
      context: {
        request: req,
        response: res,
        user: user || null
      }
    })(req, res);
};
