import { DataSource } from 'typeorm';
import { Campaign } from './entities/compaign.entity';

export const campaignProviders = [
  {
    provide: 'CAMPAIGN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Campaign),
    inject: ['DATA_SOURCE'],
  },
];
