import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Campaign } from 'src/campaign/entities/compaign.entity';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  rate: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'cam_id' })
  camId: string;

  @ManyToOne(() => Campaign)
  @JoinColumn({ name: 'cam_id' })
  cam: Campaign;
}
