import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('org')
export class ORG {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column()
  image: string;

  @Column()
  status: string;

  @Column({ name: 'institute_number' })
  instituteNumber: string;

  @Column({ name: 'license_number' })
  licenseNumber: string;

  @Column()
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
