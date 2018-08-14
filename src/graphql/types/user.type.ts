const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString }
  })
});
