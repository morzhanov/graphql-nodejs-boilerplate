import {Connection} from "typeorm";
import app from '../app';
import {User} from "../entities/user.entity";

const graphql = require('graphql');
const connection: Connection = app.get('db');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    username: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString}
  })
});

const UsersQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: UserType,
      args: {id: {type: GraphQLID}},
      resolve(parentValue: any, args: any) {
        return connection.manager.getRepository(User).find(args.id);
      }
    }
  }
});

export default new GraphQLSchema({
  query: UsersQuery
});
