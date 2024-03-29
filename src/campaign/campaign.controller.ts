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

  @Post('/search/order/:id')
  async findAllSortedByType(@Body() sortByDto: any,@Param('id') id: string) {
    return this.campaignService.findAllSortedByIdAndColumn(sortByDto, id);
  }

  @Get('/total-amount/:id')
  async getTotalAmount(@Param('id') id: string) {
    return this.campaignService.getTotalAmount(id);
  }

  @Get(':id/:year/amounts')
  async getAmountsByYear(@Param('year') year: number, @Param('id') id: string) {
    return this.campaignService.getAmountsByYear(year, id);
  }
  @Get(':id/:year/:month/amounts')
  async getAmountsByMonth(@Param('year') year: number,@Param('month') month: number, @Param('id') id: string) {
    return this.campaignService.getAmountsByMonth(year, month, id);
  }

}
