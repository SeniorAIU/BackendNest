import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OppertunityService } from './oppertunity.service';
import { OppertunityDto, UpdateOppertunityDto } from './dto/oppertunity.dto';

@Controller('oppertunity')
export class OppertunityController {
  constructor(private readonly oppertunityService: OppertunityService) {}

  @Get()
  getcampaign() {
    return this.oppertunityService.getNeedy();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oppertunityService.findOne(id);
  }

  @Get('/oppertunity/search')
  findOneBy(@Body() data: any) {
    return this.oppertunityService.findOneby(data);
  }

  @Post()
  createcampaign(@Body() data: OppertunityDto): any {
    return this.oppertunityService.createNeedy(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOppertunityDto: UpdateOppertunityDto,
  ) {
    return this.oppertunityService.update(id, updateOppertunityDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.oppertunityService.delete(id);
  }
}
