import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class User {
  static create(
    {
      id,
      email,
      password,
      token
    }: {
      id: number,
      email: string,
      password: string,
      token: string
    }) {
    const user = new User();
    user.id = id;
    user.email = email;
    user.password = password;
    user.token = token;
    return user;
  }

  @PrimaryColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  token: string;
}
