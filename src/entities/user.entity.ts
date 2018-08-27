import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import { UserService } from "../services/user.service";

@Entity()
export class User {
  static create({ email, password }: { email: string; password: string }) {
    const user = new User();
    user.email = email;
    user.password = password;
    return user;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column("text")
  email: string;

  @Column({ type: "text", readonly: true })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPwd() {
    this.password = await UserService.cryptPassword(this.password);
  }
}
