import {Column, Entity, PrimaryColumn, BeforeInsert, BeforeUpdate} from 'typeorm';
import { UserService } from '../services';

@Entity()
export class User {
  static create(
    {
      id,
      email,
      password
    }: {
      id: number,
      email: string,
      password: string
    }) {
    const user = new User();
    user.id = id;
    user.email = email;
    user.password = password;
    return user;
  }

  @PrimaryColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPwd () {
    this.password = await UserService.cryptPassword(this.password)
  }
}
