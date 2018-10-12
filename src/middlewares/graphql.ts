import expressGraphQL from "express-graphql";
import { Request, Response } from "express";
import { PrivateSchema, AuthSchema } from "../graphql";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

export const GraphQLMiddleware = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization;
  let authorized = false;
  let user = {};

  if (accessToken) {
    try {
      const { id } = await AuthService.verifyToken(accessToken);
      user = await UserService.getUser(id);
      if (user) {
        authorized = true;
      }
    } catch (e) {
      authorized = false;
    }
  }

  const schema = authorized ? PrivateSchema : AuthSchema;

  const graphql = (user: any) =>
    expressGraphQL({
      schema: schema,
      graphiql: true,
      context: {
        request: req,
        response: res,
        user: user || null
      }
    } as expressGraphQL.Options)(req, res);

  graphql(user);
};
