import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Post {
  static create({
    id,
    url,
    likes,
    owner
  }: {
    id: number;
    url: string;
    likes?: number;
    owner: number;
  }) {
    const post = new Post();
    post.id = id;
    post.url = url;
    post.likes = likes || 0;
    post.owner = owner;
    return post;
  }

  @PrimaryColumn()
  id: number;

  @Column("text")
  url: string;

  @Column("integer")
  likes: number;

  @Column("integer")
  owner: number;
}
