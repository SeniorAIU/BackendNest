import { DataSource } from 'typeorm';
import { Needy } from './entities/needy.entity';

export const needyProviders = [
  {
    provide: 'NEEDY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Needy),
    inject: ['DATA_SOURCE'],
  },
];
