import { Connection, createConnection } from "typeorm";
import config from "./config";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";

interface DB {
  connection?: Connection;
}

export const db: DB = {};

export const connect = async () => {
  const connection = await createConnection({
    type: "postgres",
    entities: [User, Post],
    synchronize: true,
    ...config
  });
  db.connection = connection;
  return connection;
};
