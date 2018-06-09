import {db} from "../db";
import {Post} from "../entities";
import {PostType} from "../graphql/types";

export const PostService = {
  getPosts: async () => {
    return await db.connection.manager
      .getRepository(Post)
      .find();
  },
  getPost: async (id: number) => {
    return await db.connection.manager
      .getRepository(Post)
      .findOne(id);
  },
  createPost: async (attrs: typeof PostType) => {
    const post = Post.create(attrs);
    return await db.connection.manager
      .getRepository(Post)
      .insert(post);
  }
};
