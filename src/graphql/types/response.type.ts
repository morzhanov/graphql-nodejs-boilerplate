const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

export const ResponseType = new GraphQLObjectType({
  name: 'ResponseType',
  fields: {
    status: {
      type: GraphQLString
    },
    error: {
      type: GraphQLString
    }
  }
});
