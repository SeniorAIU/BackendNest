// import { PeroriyEnum } from 'src/enum/perority-enum';
// import { StatusEnum } from 'src/enum/status-enum';
// import { ORG } from 'src/org/entities/org.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Exclude } from 'class-transformer';

@Entity('needy')
export class Needy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  job: string;

  @Column()
  status: string;

  @Column({ name: 'email', unique: true })
  email: string;
}
