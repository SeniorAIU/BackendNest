import { Module } from '@nestjs/common';
import { OppertunityController } from './oppertunity.controller';
import { OppertunityService } from './oppertunity.service';
import { DatabaseModule } from 'src/database/database.module';
import { OppertunityProvider } from './oppertunity.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OppertunityController],
  providers: [...OppertunityProvider, OppertunityService],
})
export class OppertunityModule {}
