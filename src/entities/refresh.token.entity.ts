import { Entity, PrimaryColumn, Column } from "typeorm";
import uuid from "uuid/v4";

@Entity()
export class RefreshToken {
  static create(userId: string) {
    const token = new RefreshToken();
    token.value = uuid();
    token.userId = userId;
    return token;
  }

  @PrimaryColumn()
  value: string;

  @Column("text")
  userId: string;
}
