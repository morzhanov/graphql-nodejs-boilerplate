import { db } from "../db";
import { SECRET } from "../constants";
import jwt = require("jsonwebtoken");
import { RefreshToken } from "../entities/refresh.token.entity";

export const AuthService = {
  issueTokenPair: async (userId: string) => {
    const refreshToken = RefreshToken.create(userId);
    await db.connection.manager
      .getRepository(RefreshToken)
      .insert(refreshToken);

    return {
      token: jwt.sign({ id: userId }, SECRET),
      reshToken: refreshToken
    };
  },

  verifyToken: async (token: string) => {
    return jwt.verify(token, SECRET);
  },

  getRefreshToken: async (value: string) => {
    return db.connection.manager
      .getRepository(RefreshToken)
      .find({ value: value });
  },

  removeRefreshToken: async ({
    value,
    userId
  }: {
    value?: string;
    userId?: string;
  }) => {
    if (value) {
      return db.connection.manager.getRepository(RefreshToken).delete(value);
    }
    if (userId) {
      return db.connection.manager
        .getRepository(RefreshToken)
        .delete({ userId: userId });
    }
  }
};
