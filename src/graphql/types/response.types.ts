import {GraphQLString} from "graphql";

const graphql = require('graphql');
const {
  GraphQLObjectType,
} = graphql;

export const SimpleResponse = new GraphQLObjectType({
  name: 'SimpleResponse',
  fields: () => ({
    message: {type: GraphQLString},
    error: {type: GraphQLString}
  })
});
