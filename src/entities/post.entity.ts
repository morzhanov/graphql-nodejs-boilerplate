import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @Column('integer')
  likes: number;

  @Column('integer')
  owner: string;
}
