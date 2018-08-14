import { Request, Response } from "express";
import { compareSync } from "bcrypt-nodejs";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

const { Router } = require("express");

const router = new Router();

router.post("/login", async (req: Request, res: Response, next: Function) => {
  const { email, password } = req.body;
  const user = await UserService.getUserByEmail(email);
  if (!user || !compareSync(password, user.password)) {
    const error = new Error("403");
    res.status(403);
    return next(error);
  }

  await AuthService.removeRefreshToken({ userId: user.id });

  const { accessToken, refreshToken } = await AuthService.issueTokenPair(
    user.id
  );
  res.status(200);
  res.set("X-Access-Token", accessToken);
  res.set("X-Refresh-Token", refreshToken);
  res.send();
});

router.post(
  "/register",
  async (req: Request, res: Response, next: Function) => {
    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email);
    if (user) {
      const error = new Error("Already exists");
      res.status(400);
      return next(error);
    }
    const newUser = await UserService.createUser(email, password);
    const { accessToken, refreshToken } = await AuthService.issueTokenPair(
      newUser.id
    );
    res.status(200);
    res.set("X-Access-Token", accessToken);
    res.set("X-Refresh-Token", refreshToken);
    res.send();
  }
);

router.post("/refresh", async (req: Request, res: Response, next: Function) => {
  const refToken = req.headers.authorization;
  const dbToken = await AuthService.getRefreshToken(refToken);
  if (!dbToken) {
    const error = new Error("Unauthorized");
    res.status(401);
    return next(error);
  }
  await AuthService.removeRefreshToken({ value: refToken });
  const { accessToken, refreshToken } = await AuthService.issueTokenPair(
    dbToken.userId
  );
  res.status(200);
  res.set("X-Access-Token", accessToken);
  res.set("X-Refresh-Token", refreshToken);
  res.send();
});

router.post("/logout", async (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization;
  const { id } = await AuthService.verifyToken(token);

  if (!id) {
    const error = new Error("Unauthorized");
    res.status(401);
    return next(error);
  }

  await AuthService.removeRefreshToken({ userId: id });

  res.status(200);
  res.send();
});

export default router;
