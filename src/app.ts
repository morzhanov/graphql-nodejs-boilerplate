global.Promise = require('bluebird');
import 'reflect-metadata';
import {Application} from "express";
import connectDatabase from './db';
import api from './routers';
import {API_URI} from './constants';

const app: Application = require('express')();
const express_graphql = require('express-graphql');
const cors = require('cors');
const {json, urlencoded} = require('body-parser');

connectDatabase().then(connection => {
  console.log(`Database connected`);
  console.log(connection.options);
  app.set('db', connection);

  const UserSchema = require('./schemas/user.schema').default;

  // Create a GraphQL endpoint
  app.use('/', express_graphql({
    schema: UserSchema,
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
app.use(API_URI, api);

export default app;

// // GRAPH QL PART
//
// // GraphQL schema
// const schema = buildSchema(`
//     type Query {
//         course(id: Int!): Course
//         courses(topic: String): [Course]
//     },
//     type Course {
//         id: Int
//         title: String
//         author: String
//         description: String
//         topic: String
//         url: String
//     }
// `);
// const coursesData = [
//   {
//     id: 1,
//     title: 'The Complete Node.js Developer Course',
//     author: 'Andrew Mead, Rob Percival',
//     description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
//     topic: 'Node.js',
//     url: 'https://codingthesmartway.com/courses/nodejs/'
//   },
//   {
//     id: 2,
//     title: 'Node.js, Express & MongoDB Dev to Deployment',
//     author: 'Brad Traversy',
//     description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
//     topic: 'Node.js',
//     url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
//   },
//   {
//     id: 3,
//     title: 'JavaScript: Understanding The Weird Parts',
//     author: 'Anthony Alicea',
//     description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
//     topic: 'JavaScript',
//     url: 'https://codingthesmartway.com/courses/understand-javascript/'
//   }
// ];
// const getCourse = function (args: any) {
//   const id = args.id;
//   return coursesData.filter(course => {
//     return course.id === id
//   })[0]
// };
// const getCourses = function (args: any) {
//   if (args.topic) {
//     const topic = args.topic;
//     return coursesData.filter(course => course.topic === topic)
//   } else {
//     return coursesData
//   }
// };
// const root = {
//   course: getCourse,
//   courses: getCourses
// };
// // Create a GraphQL endpoint
// app.use('/', express_graphql({
//   schema: schema,
//   rootValue: root,
//   graphiql: true
// }));