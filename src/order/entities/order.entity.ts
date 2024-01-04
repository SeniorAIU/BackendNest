import { StatusEnum } from 'src/enum/status-enum';
import { ORG } from 'src/org/entities/org.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: StatusEnum })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'org_id' })
  orgId: string;

  @ManyToOne(() => ORG)
  @JoinColumn({ name: 'org_id' })
  org: ORG;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'float', nullable: true })
  rating: number;
}
