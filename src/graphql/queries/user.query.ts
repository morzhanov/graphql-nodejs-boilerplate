import {User} from "../../entities";
import {GraphQLInt, GraphQLList, GraphQLNonNull} from "graphql";
import {UserType} from '../types';
import {db} from "../../db";

export const UsersQuery = {
  type: new GraphQLList(UserType),
  async resolve() {
    return await db.connection.manager.getRepository(User).find();
  }
};

export const UserQuery = {
  type: new GraphQLList(UserType),
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)}
  },
  async resolve(value: any, {id}: {id: number}) {
    return await db.connection.manager.getRepository(User).findOne(id);
  }
};
