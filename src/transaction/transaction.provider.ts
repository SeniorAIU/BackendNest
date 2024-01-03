import { DataSource } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Campaign } from 'src/campaign/entities/compaign.entity';
import { User } from 'src/user/entities/user.entity';

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
];
