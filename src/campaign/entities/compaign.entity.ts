import { PeroriyEnum } from 'src/enum/perority-enum';
import { StatusEnum } from 'src/enum/status-enum';
import { ORG } from 'src/org/entities/org.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Exclude } from 'class-transformer';
import { Transaction } from 'src/transaction/entities/transaction.entity';

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

  @Column({default:0})
  donation: number;

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

  @Column({ name: 'org_id' })
  orgId: string;

  @ManyToOne(() => ORG)
  @JoinColumn({ name: 'org_id' }) // This is the foreign key in the Campaign table
  org: ORG;

  // @OneToMany(() => Transaction, (transaction) => transaction.camp)
  // @JoinColumn({ name: 'camp_id' })
  // transaction: Transaction[];
}
