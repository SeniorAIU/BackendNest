    import { Order } from 'src/order/entities/order.entity';
    import { User } from 'src/user/entities/user.entity';
    import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    } from 'typeorm';

    @Entity('cart')
    export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amount: number;

    @Column({ default:"Pending"})
    status: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'order_id' })
    orderId: String;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;
    }
