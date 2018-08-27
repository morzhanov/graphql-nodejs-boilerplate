import { GraphQLNonNull, GraphQLString } from "graphql";
import { SimpleResponse } from "../types/response.types";
import { AuthResponseType } from "../types/auth.types";
import { UserType } from "../types/user.type";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { User } from "../../entities/user.entity";

export const UpdateUserMutation = {
  type: AuthResponseType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (value: any, attrs: typeof UserType, context: any) => {
    // check is user with this email already exists if user want to change email
    if (attrs.email !== context.user.email) {
      const dbUser: User = await UserService.getUserByEmail(attrs.email);

      if (dbUser && dbUser.id !== context.user.id) {
        return new Error("User with this email already exists.");
      }
    }

    attrs.id = context.user.id;
    const user: User = await UserService.updateUser(attrs);

    await AuthService.removeRefreshToken({ userId: user.id });
    const { accessToken, refreshToken } = await AuthService.issueTokenPair(
      user.id
    );
    return { accessToken, refreshToken };
  }
};

export const DeleteUserMutation = {
  type: SimpleResponse,
  resolve: async (value: any, attrs: any, context: any) => {
    return await UserService.deleteUser(context.user);
  }
};
