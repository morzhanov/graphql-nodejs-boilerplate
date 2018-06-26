import {PostQuery, PostsQuery, UserQuery, UsersQuery} from "./queries";
import {
  AddPostMutation,
  AddUserMutation,
  DeletePostMutation,
  DeleteUserMutation, UpdatePostMutation,
  UpdateUserMutation
} from "./mutations";
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

const AuthQueryType = new GraphQLObjectType({
  name: 'AuthQueryType',
  fields: {
    posts: PostQuery
  }
});

const RootMutationsType = new GraphQLObjectType({
  name: 'RootMutationsType',
  fields: {
    addPost: AddPostMutation,
    deleteUser: DeleteUserMutation,
    deletePost: DeletePostMutation,
    updateUser: UpdateUserMutation,
    updatePost: UpdatePostMutation
  }
});

const AuthMutationsType = new GraphQLObjectType({
  name: 'AuthMutationsType',
  fields: {
    addUser: AddUserMutation
  }
});

export const AuthQuery = new GraphQLSchema({
  query: AuthQueryType,
  mutation: AuthMutationsType
});

export const RootQuery = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationsType
});
