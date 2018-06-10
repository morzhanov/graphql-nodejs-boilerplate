import 'reflect-metadata';
import {Application} from "express";
import {connect} from './db';
import {AuthMiddleware, GraphQLMiddleware} from "./middlewares";

global.Promise = require('bluebird');

const app: Application = require('express')();
const cors = require('cors');
const {json, urlencoded} = require('body-parser');

connect().then(connection => {
  console.log(`Database connected`);
  console.log(connection.options);

  app.use('/', AuthMiddleware);
  app.use('/', GraphQLMiddleware);
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
app.use(urlencoded({extended: false}));

export default app;
