import { GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { PostType } from "../types/post.type";
import { PostService } from "../../services/post.service";

export const PostsQuery = {
  type: new GraphQLList(PostType),
  resolve: async () => {
    return await PostService.getPosts();
  }
};

export const PostQuery = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: async (value: any, { id }: { id: number }) => PostService.getPost(id)
};
