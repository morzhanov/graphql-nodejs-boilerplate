import uuid = require("uuid/v4");
import jwt = require("jsonwebtoken");

async function issueTokenPair(userId: string) {
  const newRefreshToken = uuid();
  // TODO add token to DB

  return {
    token: jwt.sign({ id: userId }, config.secret),
    refreshToken: newRefreshToken
  };
}
