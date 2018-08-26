import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  static create({
    id,
    content,
    owner
  }: {
    id: number;
    content: string;
    owner: number;
  }) {
    const post = new Post();
    post.id = id;
    post.content = content;
    post.owner = owner;
    return post;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  content: string;

  @Column("integer")
  owner: number;
}
