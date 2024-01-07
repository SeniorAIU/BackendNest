import { StatusEnum } from 'src/enum/status-enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ORG } from 'src/org/entities/org.entity';

@Entity('oppertunity')
export class Oppertunity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column({ type: 'jsonb', default: '[]' })
  requirment: Array<string>;

  @Column()
  start_date: string;

  @Column({ default: 0 })
  volunteers: number;

  @Column()
  end_date: string;

  @Column()
  type: string;

  @Column({ type: 'enum', enum: StatusEnum })
  status: string;

  @Column()
  note: string;

  @Column()
  license: string;

  @Column()
  number_user: string;

  @Column({ name: 'org_id' })
  orgId: string;

  @ManyToOne(() => ORG)
  @JoinColumn({ name: 'org_id' }) // This is the foreign key in the Campaign table
  org: ORG;
}
