import 'reflect-metadata';
import { Application } from "express";
import { connect } from './db';
import { AuthMiddleware, GraphQLMiddleware } from "./middlewares";
import { UserService } from "./services";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import passport from "passport";
import { User } from "./entities";

global.Promise = require('bluebird');

const app: Application = require('express')();
const cors = require('cors');
const { json, urlencoded } = require('body-parser');

passport.use(new BearerStrategy(async (token, done) => {
  try {
    const user: User = await UserService.getUserByToken(token)
  
    if (!user) {
      return done(new Error('Unauthorized'));
    }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
}));

connect().then(connection => {
  console.log(`Database connected`);
  console.log(connection.options);

  app.get('/', (q, s) => s.send('Hello'));
  app.use('/auth', AuthMiddleware);
  app.use('/api', GraphQLMiddleware);
});

if (app.get('env') !== 'development') {
  const logger = require('morgan');
  app.use(logger('dev'));
}

if (app.get('env') === 'production') {
  const helmet = require('helmet');
  app.use(helmet());
}

app.use(cors());
app.use(json());
app.use(passport.initialize());
app.use(passport.session());
app.use(urlencoded({ extended: false }));

export default app;
