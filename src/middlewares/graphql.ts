import { User } from "../entities";
import { Request, Response } from "express";
import { RootQuery } from "../graphql";
const ExpressGraphQL = require("express-graphql");
const AuthService = require("../services/auth.service");
const UserService = require("../services/user.service");

export const GraphQLMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const graphql = (user: User) =>
    ExpressGraphQL({
      schema: RootQuery,
      graphiql: true,
      context: {
        request: req,
        response: res,
        user: user || null
      }
    })(req, res);

  const accessToken = req.headers["Authorization"];
  if (!accessToken) {
    const error = new Error("Unauthorized");
    res.status(401);
    return next(error);
  }
  const { userId } = await AuthService.verifyToken(accessToken);
  const user = await UserService.getUser(userId);
  graphql(user);
};
