import {GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import {SimpleResponse, UserType} from '../types';
import {UserService} from "../../services";
import { Context } from "vm";
import { User } from "../../entities";

export const AddUserMutation = {
  type: UserType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (value: any, attrs: typeof UserType, context: any) => {
    const {response} = context
    const user: User =  await UserService.createUser(attrs);

    const token = UserService.createToken(user);
    response.setHeader('X-Token', `Bearer ${token}`)
    return user
  }
};

export const UpdateUserMutation = {
  type: UserType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (value: any, attrs: typeof UserType, context: any) => {
    const {response} = context
    const user: User =  await UserService.updateUser(attrs);

    const token = UserService.createToken(user);
    response.setHeader('X-Token', `Bearer ${token}`)
    return user
  }
};

export const DeleteUserMutation = {
  type: SimpleResponse,
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)}
  },
  resolve: async (value: any, {id}: {id: number}, context: any) => {
    return await UserService.deleteUser(id);
  }
};
