const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} = require("graphql");

export const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    owner: { type: GraphQLInt }
  })
});
