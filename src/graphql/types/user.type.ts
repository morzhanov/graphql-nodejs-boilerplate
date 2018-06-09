import {User} from "../../entities/index";

const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = graphql;

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    email: {type: GraphQLString},
    password: {type: GraphQLString}
  })
});
