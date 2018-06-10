import {GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import {SimpleResponse, UserType} from '../types';
import {UserService} from "../../services";

export const AddUserMutation = {
  type: UserType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    token: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (value: any, attrs: typeof UserType) => {
    return await UserService.createUser(attrs);
  }
};

export const UpdateUserMutation = {
  type: UserType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    token: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (value: any, attrs: typeof UserType) => {
    return await UserService.updateUser(attrs);
  }
};

export const DeleteUserMutation = {
  type: SimpleResponse,
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)}
  },
  resolve: async (value: any, {id}: {id: number}) => {
    return await UserService.deleteUser(id);
  }
};
