import { DataSource } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Campaign } from 'src/campaign/entities/compaign.entity';

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
];
