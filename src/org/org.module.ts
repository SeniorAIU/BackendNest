import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';
import { orgProviders } from './org.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrgController],
  providers: [...orgProviders, OrgService],
  exports: [OrgService],
})
export class OrgModule {}
