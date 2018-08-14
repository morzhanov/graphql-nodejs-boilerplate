import { GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { UserType } from "../types/user.type";
import { UserService } from "../../services/user.service";

export const UsersQuery = {
  type: new GraphQLList(UserType),
  resolve: async () => await UserService.getUsers()
};

export const UserQuery = {
  type: new GraphQLList(UserType),
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: async (value: any, { id }: { id: number }) => UserService.getUser(id)
};
