import {createConnection} from 'typeorm';
import config from './config'
import {User} from "../entities/user.entity";

export default {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
      type: 'postgres',
      entities: [
        User
      ],
      synchronize: true,
      ...config
    }),
  };
