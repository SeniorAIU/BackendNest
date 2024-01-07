import { Campaign } from 'src/campaign/entities/compaign.entity';
import { Oppertunity } from 'src/oppertunity/entities/oppertunity.entity';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('volunteer')
export class Volunteer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'oppertunity_id' })
  OppertunityId: string;

  @ManyToOne(() => Oppertunity)
  @JoinColumn({ name: 'oppertunity_id' })
  oppertunity: Oppertunity;
}
