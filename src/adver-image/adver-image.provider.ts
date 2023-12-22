import { DataSource } from 'typeorm';
import { adverImage } from './entities/adver-image.entity';

export const AdverImageProvider = [
  {
    provide: 'ADVERIMAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(adverImage),
    inject: ['DATA_SOURCE'],
  },
];
