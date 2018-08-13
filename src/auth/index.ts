import { Request, Response } from "express";
import { compareSync } from "bcrypt-nodejs";
import { User } from "../entities";
import { RefreshToken } from "../entities/refresh.token.entity";
const { Router } = require("express");
const AuthService = require("../services/auth.service");
const UserService = require("../services/user.service");

const router = new Router();

router.post("/login", async (req: Request, res: Response, next: Function) => {
  const { email, password } = req.body;
  const user = await UserService.getByEmail(email);
  if (!user || !compareSync(password, user.password)) {
    const error = new Error("403");
    res.status(403);
    return next(error);
  }
  const { accessToken, refreshToken } = await AuthService.issueTokenPair(
    user.id
  );
  res.status(200);
  res.set("X-Access-Token", accessToken);
  res.set("X-Refresh-Token", refreshToken);
  res.send();
});

router.post("/signup", async (req: Request, res: Response, next: Function) => {
  const { email, password } = req.body;
  const user = await UserService.getByEmail(email);
  if (user) {
    const error = new Error("Already exists");
    res.status(400);
    return next(error);
  }
  const newUser: User = UserService.createUser(email, password);
  const { accessToken, refreshToken } = await AuthService.issueTokenPair(
    newUser.id
  );
  res.status(200);
  res.set("X-Access-Token", accessToken);
  res.set("X-Refresh-Token", refreshToken);
  res.send();
});

router.post("/refresh", async (req: Request, res: Response, next: Function) => {
  const refToken = req.headers["Authorization"];
  const dbToken: RefreshToken = await AuthService.getRefreshToken(refToken);
  if (!dbToken) {
    const error = new Error("Unauthorized");
    res.status(401);
    return next(error);
  }
  await AuthService.removeRefreshToken(refToken);
  const { accessToken, refreshToken } = await AuthService.issueTokenPair(
    dbToken.userId
  );
  res.status(200);
  res.set("X-Access-Token", accessToken);
  res.set("X-Refresh-Token", refreshToken);
  res.send();
});

router.post("/logout", async (req: Request, res: Response) => {
  const token = req.headers["Authorization"];
  const { userId } = AuthService.verifyToken(token);

  await UserService.removeRefreshToken({ userId });

  res.status(200);
  res.send();
});

export default router;
