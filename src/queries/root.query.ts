import {Post, User} from "../entities";
import {GraphQLList, GraphQLObjectType, GraphQLSchema} from "graphql";
import {Connection} from "typeorm";
import app from "../app";
import {PostType, UserType} from '../schemas';

const connection: Connection = app.get('db');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        return await connection.manager.getRepository(User).find();
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve() {
        return await connection.manager.getRepository(Post).find();
      }
    }
  }
});

export const RootQuery = new GraphQLSchema({
  query: RootQueryType
});
