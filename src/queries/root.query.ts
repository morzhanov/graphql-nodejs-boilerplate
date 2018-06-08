import {User} from "../entities/user.entity";
import {GraphQLList, GraphQLObjectType, GraphQLSchema} from "graphql";
import {Connection} from "typeorm";
import app from "../app";
import {UserType} from '../schemas';

const connection: Connection = app.get('db');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        const res = await connection.manager.getRepository(User).find();
        console.log(res);
        return res;
      }
    }
  }
});

export const RootQuery = new GraphQLSchema({
  query: RootQueryType
});
