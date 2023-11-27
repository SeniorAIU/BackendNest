import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'fake_name', nullable: true })
  fakeName: string;

  @Column()
  birthDate: Date;

  @Column()
  job: string;

  @Column({ name: 'phone_number', nullable: true })
  phone: string;

  @Column({ type: 'jsonb', default: '[]' })
  habbies: Array<string>;

  @Column()
  type: string;

  @Column()
  address: string;

  @Column()
  country: string;

  @Column()
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
