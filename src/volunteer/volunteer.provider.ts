import { DataSource } from 'typeorm';
import { Volunteer } from './entities/volunteer.entity';
import { Oppertunity } from 'src/oppertunity/entities/oppertunity.entity';
import { User } from 'src/user/entities/user.entity';

export const VolunteerProviders = [
  {
    provide: 'VOLUNTEER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Volunteer),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'OPPERTUNITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Oppertunity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
