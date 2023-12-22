import { Module } from '@nestjs/common';
import { AdverImageController } from './adver-image.controller';
import { AdverImageService } from './adver-image.service';
import { DatabaseModule } from 'src/database/database.module';
import { AdverImageProvider } from './adver-image.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AdverImageController],
  providers: [...AdverImageProvider, AdverImageService],
})
export class AdverImageModule {}
