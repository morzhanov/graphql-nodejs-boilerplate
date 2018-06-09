import {PostQuery, PostsQuery, UserQuery, UsersQuery} from "./queries";
import {AddPostMutation, AddUserMutation, DeletePostMutation, DeleteUserMutation} from "./mutations";
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
    addPost: AddPostMutation,
    deleteUser: DeleteUserMutation,
    deletePost: DeletePostMutation
  }
});

export const RootQuery = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationsType
});
