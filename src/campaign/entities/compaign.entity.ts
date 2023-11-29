import { PeroriyEnum } from 'src/enum/perority-enum';
import { StatusEnum } from 'src/enum/status-enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('campaign')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  target: number;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column()
  country: string;

  @Column()
  note: string;

  @Column()
  type: string;

  @Column({ name: 'start_time' })
  startTime: Date;

  @Column({ name: 'end_time' })
  endTime: Date;

  @Column({ type: 'enum', enum: PeroriyEnum })
  preority: string;

  @Column({ type: 'enum', enum: StatusEnum })
  status: string;

  @Column({ type: 'jsonb', default: '[]' })
  category: Array<string>;

  @Column()
  address: string;

  @Column()
  feedback: string;

  @Column()
  rate: number;

  @Column({ name: 'license_number' })
  licenseNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
