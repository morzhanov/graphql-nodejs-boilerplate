import { compareSync } from "bcrypt-nodejs";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { LoginType, RegisterType, AuthResponseType } from "../types/auth.types";
import { SimpleResponse } from "../types/response.types";

export const LoginMutation = {
  type: AuthResponseType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_: any, attrs: typeof LoginType) => {
    const { email, password } = attrs;
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      const error = new Error("User not found");
      return error;
    }

    if (!compareSync(password, user.password)) {
      const error = new Error("Wrong email or password");
      return error;
    }

    await AuthService.removeRefreshToken({ userId: user.id });

    const { accessToken, refreshToken } = await AuthService.issueTokenPair(
      user.id
    );
    return { accessToken, refreshToken };
  }
};

export const RegisterMutation = {
  type: AuthResponseType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_: any, attrs: typeof RegisterType) => {
    const { email, password } = attrs;
    const user = await UserService.getUserByEmail(email);
    if (user) {
      const error = new Error("Already exists");
      return error;
    }
    const newUser = await UserService.createUser(email, password);
    const { accessToken, refreshToken } = await AuthService.issueTokenPair(
      newUser.id
    );
    return { accessToken, refreshToken };
  }
};

export const LogoutMutation = {
  type: SimpleResponse,
  resolve: async (value: any, attrs: any, context: any) => {
    const token = context;
    const { id } = await AuthService.verifyToken(token);

    if (!id) {
      const error = new Error("Unauthorized");
      return error;
    }

    await AuthService.removeRefreshToken({ userId: id });

    return { message: "logged out" };
  }
};

export const RefreshTokenMutation = {
  type: AuthResponseType,
  args: {
    refreshToken: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_: any, attrs: any) => {
    const refToken = attrs.refreshToken;
    const dbToken = await AuthService.getRefreshToken(refToken);
    if (!dbToken) {
      const error = new Error("Unauthorized");
      return error;
    }
    await AuthService.removeRefreshToken({ value: refToken });
    const { accessToken, refreshToken } = await AuthService.issueTokenPair(
      dbToken.userId
    );
    return { accessToken, refreshToken };
  }
};
