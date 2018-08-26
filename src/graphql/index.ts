import { UserQuery, UsersQuery } from "./queries/user.query";
import { PostQuery, PostsQuery } from "./queries/post.query";
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  DeleteUserMutation,
  UpdateUserMutation
} from "./mutations/user.mutatons";
import {
  LoginMutation,
  RegisterMutation,
  LogoutMutation,
  RefreshTokenMutation
} from "./mutations/auth.mutatons";
import {
  AddPostMutation,
  DeletePostMutation,
  UpdatePostMutation
} from "./mutations/post.mutatons";

const PrivateQueryType = new GraphQLObjectType({
  name: "PrivateQueryType",
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
    posts: PostsQuery
  }
});

const PrivateMutationsType = new GraphQLObjectType({
  name: "PrivateMutationsType",
  fields: {
    logout: LogoutMutation,
    refreshToken: RefreshTokenMutation,
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
    register: RegisterMutation,
    login: LoginMutation
  }
});

export const AuthSchema = new GraphQLSchema({
  query: AuthQueryType,
  mutation: AuthMutationsType
});

export const PrivateSchema = new GraphQLSchema({
  query: PrivateQueryType,
  mutation: PrivateMutationsType
});
