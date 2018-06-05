import {createConnection} from 'typeorm';
import {User} from "../entities/user.entity";

export default {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      entities: [
        User
      ],
      synchronize: true
    }),
  };
