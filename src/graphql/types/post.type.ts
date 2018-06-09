const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} = graphql;

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {type: GraphQLID},
    url: {type: GraphQLString},
    likes: {type: GraphQLInt},
    owner: {type: GraphQLInt}
  })
});
