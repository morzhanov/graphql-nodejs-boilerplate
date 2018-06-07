import {Connection} from "typeorm";
import app from '../app';
import {User} from "../entities/user.entity";

const graphql = require('graphql');
const connection: Connection = app.get('db');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    email: {type: GraphQLString},
    password: {type: GraphQLString}
  })
});

const UsersQuery = new GraphQLObjectType({
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

export default new GraphQLSchema({
  query: UsersQuery
});
