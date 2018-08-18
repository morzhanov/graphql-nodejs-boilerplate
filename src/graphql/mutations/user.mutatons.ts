import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { SimpleResponse } from "../types/response.types";
import { UserType } from "../types/user.type";
import { UserService } from "../../services/user.service";
import { User } from "../../entities/user.entity";

export const UpdateUserMutation = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (value: any, attrs: typeof UserType, context: any) => {
    const { response } = context;

    // check is user with this email already exists if user want to change email
    if (attrs.email !== context.user.email) {
      const dbUser: User = await UserService.getUserByEmail(attrs.email);

      if (dbUser && dbUser.id !== context.user.id) {
        return new Error("User with this email already exists.");
      }
    }

    const user: User = await UserService.updateUser(attrs);

    const token = UserService.createToken(user);
    response.setHeader("X-Token", `Bearer ${token}`);
    return user;
  }
};

export const DeleteUserMutation = {
  type: SimpleResponse,
  resolve: async (value: any, attrs: any, context: any) => {
    return await UserService.deleteUser(context.user);
  }
};
