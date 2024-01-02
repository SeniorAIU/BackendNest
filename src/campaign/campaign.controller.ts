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
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get()
  getcampaign() {
    return this.campaignService.getcampaign();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(id);
  }

  @Post('/campaign/search')
  findOneBy(@Body() data: any) {
    return this.campaignService.findOneby(data);
  }

  @Post()
  createcampaign(@Body() data: CreateCampaignDto): any {
    return this.campaignService.createcampaign(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateCampaignDto) {
    return this.campaignService.update(id, updateRoleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.campaignService.delete(id);
  }
}
