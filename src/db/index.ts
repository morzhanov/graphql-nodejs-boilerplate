import {createConnection} from 'typeorm';
import config from './config';
import {User} from "../entities/user.entity";

export default async () => await createConnection({
  type: 'postgres',
  entities: [
    User
  ],
  synchronize: true,
  extra: {
    ssl: true
  },
  ...config
});
