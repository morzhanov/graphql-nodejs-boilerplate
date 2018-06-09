import {db} from "../db";
import {Post} from "../entities";

export default class PostService {
  static getPosts = async () => {
    return await db.connection.manager.getRepository(Post).find();
  };

  static getPost = async (id: number) => {
    return await db.connection.manager.getRepository(Post).findOne(id);
  };
}
