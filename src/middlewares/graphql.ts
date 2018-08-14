import ExpressGraphQL from "express-graphql";
import { User } from "../entities/user.entity";
import { Request, Response } from "express";
import { RootQuery } from "../graphql";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

export const GraphQLMiddleware = async (req: Request, res: Response) => {
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

  const accessToken = req.headers.authorization;
  if (!accessToken) {
    res.status(401);
    return res.send("Unauthorized");
  }
  const { id } = await AuthService.verifyToken(accessToken);
  const user = await UserService.getUser(id);

  if (!user) {
    res.status(401);
    return res.send("Unauthorized");
  }

  graphql(user);
};
