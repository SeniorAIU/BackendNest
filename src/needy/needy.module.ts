import { Module } from '@nestjs/common';
import { NeedyController } from './needy.controller';
import { NeedyService } from './needy.service';
import { DatabaseModule } from 'src/database/database.module';
import { needyProviders } from './needy.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NeedyController],
  providers: [...needyProviders, NeedyService],
})
export class NeedyModule {}
