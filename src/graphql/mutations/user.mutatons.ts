import {GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import {UserType} from '../types';
import {UserService} from "../../services";

export const AddUserMutation = {
  type: UserType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (value: any, attrs: typeof UserType) => {
    return await UserService.createUser(attrs);
  }
};
