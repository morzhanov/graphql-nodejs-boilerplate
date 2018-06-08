import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @Column('integer')
  likes: string;

  @Column('integer')
  owner: string;
}
