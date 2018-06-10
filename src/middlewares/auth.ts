import express from 'express';
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import {UserService} from "../services";

passport.use(new BearerStrategy(async (token, done) => {
  try {
    const user = await UserService.getUserByToken(token);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  }catch (e) {
      return done(e);
  }
}));

export const AuthMiddleware = express();
AuthMiddleware.use(passport.initialize());
AuthMiddleware.use(passport.session());
