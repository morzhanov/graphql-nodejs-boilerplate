import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "../types/user.type";
import { UserService } from "../../services/user.service";

export const UsersQuery = {
  type: new GraphQLList(UserType),
  resolve: async () => await UserService.getUsers()
};

export const UserQuery = {
  type: UserType,
  resolve: async (value: any, attrs: any, context: any) =>
    UserService.getUser(context.user.id)
};
