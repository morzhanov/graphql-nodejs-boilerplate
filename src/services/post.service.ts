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
    await db.connection.manager
      .getRepository(Post)
      .insert(post);
    return post
  },
  updatePost: async (attrs: typeof PostType) => {
    await db.connection.manager
      .getRepository(Post)
      .update({id: attrs.id}, attrs);
    return await db.connection.manager
      .getRepository(Post)
      .findOne(attrs.id);
  },
  deletePost: async (id: number) => {
    const post = await db.connection.manager
      .getRepository(Post)
      .findOne(id);
    await db.connection.manager
      .getRepository(Post)
      .delete(id);
    return post ? {
      message: 'deleted'
    } : {
      message: 'no post found'
    };
  }
};
