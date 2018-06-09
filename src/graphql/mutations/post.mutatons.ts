import {Post} from "../../entities";
import {GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import {ResponseType} from '../types';
import {db} from "../../db";

export const AddPostMutation = {
  type: ResponseType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  async resolve(value: any, attrs: {id: number, url: string, likes: number, owner: number}) {
    const post = Post.create(attrs);
    try {
      const res = await db.connection.manager
        .getRepository(Post)
        .insert(post);
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
