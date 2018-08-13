import { Request, Response } from "express";
import { AuthQuery } from "../graphql";

const ExpressGraphQL = require("express-graphql");

export const AuthMiddleware = (req: Request, res: Response) => {
  ExpressGraphQL({
    schema: AuthQuery,
    graphiql: true,
    context: {
      request: req,
      response: res
    }
  })(req, res);
};
