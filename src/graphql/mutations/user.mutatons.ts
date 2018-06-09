import {User} from "../../entities";
import {GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import {ResponseType} from '../types';
import {db} from "../../db";

export const AddUserMutation = {
  type: ResponseType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  async resolve(value: any, attrs: { id: number, email: string, password: string }) {
    const user = User.create(attrs);
    try {
      const res = await db.connection.manager
        .getRepository(User)
        .insert(user);
      return {
        status: 'Success'
      }
    } catch (e) {
      return {
        status: 'Failure',
        error: e.detail
      }
    }
  }
};
