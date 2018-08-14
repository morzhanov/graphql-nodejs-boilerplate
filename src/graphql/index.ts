import { UserQuery, UsersQuery } from "./queries/user.query";
import { PostQuery, PostsQuery } from "./queries/post.query";
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  AddUserMutation,
  DeleteUserMutation,
  UpdateUserMutation,
  LoginUser
} from "./mutations/user.mutatons";
import {
  AddPostMutation,
  DeletePostMutation,
  UpdatePostMutation
} from "./mutations/post.mutatons";

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: UsersQuery,
    user: UserQuery,
    posts: PostsQuery,
    post: PostQuery
  }
});

const AuthQueryType = new GraphQLObjectType({
  name: "AuthQueryType",
  fields: {
    posts: PostQuery
  }
});

const RootMutationsType = new GraphQLObjectType({
  name: "RootMutationsType",
  fields: {
    addPost: AddPostMutation,
    deleteUser: DeleteUserMutation,
    deletePost: DeletePostMutation,
    updateUser: UpdateUserMutation,
    updatePost: UpdatePostMutation
  }
});

const AuthMutationsType = new GraphQLObjectType({
  name: "AuthMutationsType",
  fields: {
    addUser: AddUserMutation,
    loginUser: LoginUser
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
