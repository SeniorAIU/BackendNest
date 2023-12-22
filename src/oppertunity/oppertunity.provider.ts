import { DataSource } from 'typeorm';
import { Oppertunity } from './entities/oppertunity.entity';

export const OppertunityProvider = [
  {
    provide: 'OPPERTUNITY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Oppertunity),
    inject: ['DATA_SOURCE'],
  },
];
