import { DataSource } from 'typeorm';
import { ORG } from './entities/org.entity';

export const orgProviders = [
  {
    provide: 'ORG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ORG),
    inject: ['DATA_SOURCE'],
  },
];
