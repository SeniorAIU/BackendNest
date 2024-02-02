import { Cart } from 'src/cart/entities/cart.entity';
import { Comments } from 'src/comment/entities/comment.entity';
import { Oppertunity } from 'src/oppertunity/entities/oppertunity.entity';
import { Order } from 'src/order/entities/order.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Volunteer } from 'src/volunteer/entities/volunteer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'fake_name', nullable: true })
  fakeName: string;

  @Column()
  birthDate: Date;

  @Column()
  job: string;

  @Column({ name: 'phoneNumber', nullable: true })
  phoneNumber: string;

  @Column({ type: 'jsonb', default: '[]' })
  habbies: Array<string>;

  @Column()
  type: string;

  @Column({ default: 0, nullable: true })
  amountDonate: number;

  @Column()
  address: string;

  @Column({default:"MALE"})
  gender: string;

  @Column()
  country: string;

  @Column()
  status: string;

  @Column({default:0})
  volunteers: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  @JoinColumn({ name: 'user_id' })
  transaction: Transaction[];

  @OneToMany(() => Volunteer, (volunteer) => volunteer.user)
  @JoinColumn({ name: 'user_id' })
  volunteer: Volunteer[];

  @OneToMany(() => Cart, (cart) => cart.user)
  @JoinColumn({ name: 'cart_id'})
  cart: Cart[];

  @OneToMany(() => Comments, (user) => user.user)
  @JoinColumn({ name: 'user_id' })
  user: Comments[];

  @OneToMany(() => Comments, (campaign) => campaign.user)
  @JoinColumn({ name: 'user_id' })
  cam: Comments[];
}
