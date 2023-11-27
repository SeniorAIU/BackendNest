import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/campaign.dto';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get()
  getcampaign(): string {
    return this.campaignService.getcampaign();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(id);
  }

  @Post()
  createcampaign(@Body() data: CreateCampaignDto): any {
    return this.campaignService.createcampaign(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: CreateCampaignDto) {
    return this.campaignService.update(id, updateRoleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.campaignService.delete(id);
  }
}
