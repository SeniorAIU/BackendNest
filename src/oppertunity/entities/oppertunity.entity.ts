import { StatusEnum } from 'src/enum/status-enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ORG } from 'src/org/entities/org.entity';
import { Volunteer } from 'src/volunteer/entities/volunteer.entity';

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
  start_date: Date;

  @Column({ default: 0 })
  volunteers: number;

  @Column({ default: 0 })
  volunteers_target: number;

  @Column()
  end_date: Date;

  @Column()
  type: string;

  @Column({ type: 'enum', enum: StatusEnum, default:"Pending" })
  status: string;

  @Column()
  note: string;

  @Column()
  license: string;

  @Column()
  image: string;

  @Column({ name: 'org_id' })
  orgId: string;

  @ManyToOne(() => ORG)
  @JoinColumn({ name: 'org_id' }) // This is the foreign key in the Campaign table
  org: ORG;

  @OneToMany(() => Volunteer, (volunteer) => volunteer.oppertunity)
  @JoinColumn({ name: 'oppertunity_id' })
  volunteer: Volunteer[];
}
