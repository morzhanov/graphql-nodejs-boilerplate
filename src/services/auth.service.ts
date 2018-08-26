import jwt = require("jsonwebtoken");
import { db } from "../db";
import { SECRET, ACCESS_TOKEN_EXPIRES } from "../constants";
import { RefreshToken } from "../entities/refresh.token.entity";
import { User } from "../entities/user.entity";

export const AuthService = {
  issueTokenPair: async (userId: string) => {
    const refreshToken = RefreshToken.create(userId);
    await db.connection.manager
      .getRepository(RefreshToken)
      .insert(refreshToken);

    return {
      accessToken: jwt.sign({ id: userId, iat: ACCESS_TOKEN_EXPIRES }, SECRET),
      refreshToken: refreshToken.value
    };
  },

  verifyToken: async (token: string) => {
    return jwt.verify(token, SECRET) as User;
  },

  getRefreshToken: async (value: string) => {
    const token = await db.connection.manager
      .getRepository(RefreshToken)
      .findOne({ where: { value: value } });
    return token;
  },

  removeRefreshToken: async ({
    value,
    userId
  }: {
    value?: string;
    userId?: string;
  }) => {
    if (value) {
      return db.connection.manager
        .createQueryBuilder()
        .delete()
        .from(RefreshToken)
        .where("value = :value")
        .setParameter("value", value)
        .execute();
    }
    if (userId) {
      return db.connection.manager
        .createQueryBuilder()
        .delete()
        .from(RefreshToken)
        .where("userId = :userId")
        .setParameter("userId", userId)
        .execute();
    }
  }
};
