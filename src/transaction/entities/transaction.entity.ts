import { Campaign } from 'src/campaign/entities/compaign.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  amount: number;

  @Column()
  status: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'camp_id' })
  campId: string;

  @ManyToOne(() => Campaign)
  @JoinColumn({ name: 'camp_id' })
  camp: Campaign;
}
