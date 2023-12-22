import { DataSource } from 'typeorm';
import { Comments } from './entities/comment.entity';

export const CommentsProvider = [
  {
    provide: 'COMMENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comments),
    inject: ['DATA_SOURCE'],
  },
];
