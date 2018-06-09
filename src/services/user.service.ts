import {db} from "../db";
import {User} from "../entities";
import {UserType} from "../graphql/types";

export const UserService = {
  getUsers: async () => {
    return await db.connection.manager
      .getRepository(User)
      .find();
  },
  getUser: async (id: number) => {
    return await db.connection.manager
      .getRepository(User)
      .findOne(id);
  },
  createUser: async (attrs: typeof UserType) => {
    const user = User.create(attrs);
    await db.connection.manager
      .getRepository(User)
      .insert(user);
    return user
  },
  deleteUser: async (id: number) => {
    const user = await db.connection.manager
      .getRepository(User)
      .findOne(id);
    await db.connection.manager
      .getRepository(User)
      .delete(id);
    return user ? {
      message: 'deleted'
    } : {
      message: 'no user found'
    };
  }
};
