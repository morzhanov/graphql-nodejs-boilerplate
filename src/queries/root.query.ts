import {Post, User} from "../entities";
import {GraphQLList, GraphQLObjectType, GraphQLSchema} from "graphql";
import {PostType, UserType} from '../schemas';
import {db} from "../db";

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        return await db.connection.manager.getRepository(User).find();
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve() {
        return await db.connection.manager.getRepository(Post).find();
      }
    }
  }
});

export const RootQuery = new GraphQLSchema({
  query: RootQueryType
});
