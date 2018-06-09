import {PostQuery, PostsQuery, UserQuery, UsersQuery} from "./queries";
import {AddPostMutation, AddUserMutation} from "./mutations";
import {GraphQLObjectType, GraphQLSchema} from "graphql";

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: UsersQuery,
    user: UserQuery,
    posts: PostsQuery,
    post: PostQuery
  }
});

const RootMutationsType = new GraphQLObjectType({
  name: 'RootMutationsType',
  fields: {
    addUser: AddUserMutation,
    addPost: AddPostMutation
  }
});

export const RootQuery = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationsType
});
