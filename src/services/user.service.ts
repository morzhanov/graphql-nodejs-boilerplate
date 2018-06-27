import { db } from "../db";
import { User } from "../entities";
import { UserType } from "../graphql/types";
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import { SECRET } from "../constants";

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
  updateUser: async (attrs: typeof UserType) => {
    await db.connection.manager
      .getRepository(User)
      .update({ id: attrs.id }, attrs);
    return await db.connection.manager
      .getRepository(User)
      .findOne(attrs.id);
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
  },
  cryptPassword: (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err: Error, salt: string) => {
        if (err) {
          reject(err)
        }
  
        bcrypt.hash(password, salt, null, (err: Error, hash: string) => {
          if (err) {
            reject(err)
          }

          resolve(hash);
        });
      });
    })
  },
  comparePassword: (plainPass: string, user: User, callback: Function) => {
    bcrypt.compare(plainPass, user.password, (err: Error, isPasswordMatch: boolean) => {
      return err == null
        ? callback(null, isPasswordMatch)
        : callback(err);
    });
  },
  createToken: (user: User) => {
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
      data: {
        id: user.id
      }
    }, SECRET);
  }
};
