import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { PostType } from "../types/post.type";
import { SimpleResponse } from "../types/response.types";
import { UserType } from "../types/user.type";
import { PostService } from "../../services/post.service";

export const AddPostMutation = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    likes: { type: new GraphQLNonNull(GraphQLInt) },
    owner: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: async (value: any, attrs: typeof UserType) => {
    return await PostService.createPost(attrs);
  }
};

export const UpdatePostMutation = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    likes: { type: new GraphQLNonNull(GraphQLInt) },
    owner: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: async (value: any, attrs: typeof PostType) => {
    return await PostService.updatePost(attrs);
  }
};

export const DeletePostMutation = {
  type: SimpleResponse,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: async (value: any, { id }: { id: number }) => {
    return await PostService.deletePost(id);
  }
};
