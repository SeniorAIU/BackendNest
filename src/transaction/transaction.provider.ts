import { DataSource } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Campaign } from 'src/campaign/entities/compaign.entity';
import { User } from 'src/user/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { Cart } from 'src/cart/entities/cart.entity';

export const transactionProviders = [
  {
    provide: 'TRANSACTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Transaction),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CAMPAIGN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Campaign),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CART_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cart),
    inject: ['DATA_SOURCE'],
  },
];
