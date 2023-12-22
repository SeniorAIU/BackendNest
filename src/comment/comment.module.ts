import { Module } from '@nestjs/common';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { DatabaseModule } from 'src/database/database.module';
import { CommentsProvider } from './comment.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [...CommentsProvider, CommentsService],
})
export class CommentsModule {}
