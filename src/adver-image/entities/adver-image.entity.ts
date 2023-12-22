import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adver_image')
export class adverImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  title: string;
}
