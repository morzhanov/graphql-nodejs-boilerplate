import { GraphQLString } from "graphql";

const { GraphQLObjectType } = require("graphql");

export const SimpleResponse = new GraphQLObjectType({
  name: "SimpleResponse",
  fields: () => ({
    message: { type: GraphQLString },
    error: { type: GraphQLString }
  })
});
