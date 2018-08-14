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
    url: { type: GraphQLString },
    likes: { type: GraphQLInt },
    owner: { type: GraphQLInt }
  })
});
