import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { User } from "../entities/user.entity";
import { UserType } from "../graphql/types/user.type";
import { SECRET } from "../constants";

export const UserService = {
  getUsers: async (): Promise<Array<User>> => {
    return await db.connection.manager.getRepository(User).find();
  },
  getUser: async (id: number): Promise<User> => {
    return await db.connection.manager.getRepository(User).findOne(id);
  },
  getUserByEmail: async (email: string): Promise<User> => {
    return await db.connection.manager
      .getRepository(User)
      .findOne({ email: email });
  },
  createUser: async (email: string, password: string): Promise<User> => {
    const user = User.create({ email, password });
    await db.connection.manager.getRepository(User).insert(user);
    return user;
  },
  updateUser: async (attrs: typeof UserType): Promise<User> => {
    await db.connection.manager
      .getRepository(User)
      .update({ id: attrs.id }, attrs);
    return await db.connection.manager.getRepository(User).findOne(attrs.id);
  },
  deleteUser: async (id: number): Promise<any> => {
    const user = await db.connection.manager.getRepository(User).findOne(id);
    await db.connection.manager.getRepository(User).delete(id);
    return user
      ? {
          message: "deleted"
        }
      : {
          message: "no user found"
        };
  },
  cryptPassword: (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err: Error, salt: string) => {
        if (err) {
          reject(err);
        }

        bcrypt.hash(password, salt, null, (err: Error, hash: string) => {
          if (err) {
            reject(err);
          }

          resolve(hash);
        });
      });
    });
  },
  comparePassword: (plainPass: string, user: User): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(
        plainPass,
        user.password,
        (err: Error, isPasswordMatch: boolean) => {
          return err == null ? resolve(isPasswordMatch) : reject(err);
        }
      );
    });
  },
  createToken: (user: User): string => {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        data: {
          id: user.id
        }
      },
      SECRET
    );
  }
};
