import {Column, Entity, PrimaryColumn} from 'typeorm';

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
}
