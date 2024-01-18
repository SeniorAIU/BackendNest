import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { DatabaseModule } from 'src/database/database.module';
import { campaignProviders } from './campaign.providers';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [DatabaseModule,ScheduleModule.forRoot(),  ],
  providers: [...campaignProviders, CampaignService],
  controllers: [CampaignController],
})
export class CampaignModule {}
