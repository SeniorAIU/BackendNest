import { Module } from '@nestjs/common';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';
import { VolunteerProviders } from './volunteer.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...VolunteerProviders,VolunteerService],
  controllers: [VolunteerController],
})
export class VolunteerModule {}
