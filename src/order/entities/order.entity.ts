import { Cart } from 'src/cart/entities/cart.entity';
import { StatusEnum } from 'src/enum/status-enum';
import { ORG } from 'src/org/entities/org.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({default:0})
  Buys: number;

  @Column({ default: 0})
  price: number;

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

  @ManyToOne(() => Cart, cart => cart.order)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

}
