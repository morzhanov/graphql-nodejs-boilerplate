import {RootQuery} from "./queries";
import 'reflect-metadata';
import {Application} from "express";
import connectDatabase from './db';

global.Promise = require('bluebird');

const app: Application = require('express')();
const express_graphql = require('express-graphql');
const cors = require('cors');
const {json, urlencoded} = require('body-parser');

connectDatabase().then(connection => {
  console.log(`Database connected`);
  console.log(connection.options);
  app.set('db', connection);

  // Create a GraphQL endpoint
  app.use('/', express_graphql({
    schema: RootQuery,
    graphiql: true
  }));
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
