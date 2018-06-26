import {Connection, createConnection} from 'typeorm';
import config from './config';
import {Post, User} from "../entities";

interface DB {
  connection?: Connection
}

export const db: DB = {};

export const connect = async () => {
  const connection = await createConnection({
    type: 'postgres',
    entities: [
      User,
      Post
    ],
    synchronize: true,
    ...config
  });
  db.connection = connection;
  return connection;
};
