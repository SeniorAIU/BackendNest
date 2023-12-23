import { Campaign } from 'src/campaign/entities/compaign.entity';
import { Oppertunity } from 'src/oppertunity/entities/oppertunity.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
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

  @Column()
  password: string;

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

  @OneToMany(() => Campaign, (campaign) => campaign.org)
  @JoinColumn({ name: 'org_id' }) // This is the foreign key in the Campaign table
  campaigns: Campaign[];

  @OneToMany(() => Oppertunity, (oppertunity) => oppertunity.org)
  @JoinColumn({ name: 'org_id' }) // This is the foreign key in the Campaign table
  oppertunity: Oppertunity[];

  @OneToMany(() => Order, (order) => order.org)
  @JoinColumn({ name: 'order_id' }) // This is the foreign key in the Campaign table
  orders: Order[];
}
