import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NeedyService } from './needy.service';
import { NeedyDto, UpdateNeedyDto } from './dto/needy.dto';

@Controller('needy')
export class NeedyController {
  constructor(private readonly needyService: NeedyService) {}

  @Get()
  getcampaign() {
    return this.needyService.getNeedy();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.needyService.findOne(id);
  }

  @Get('/needy/search')
  findOneBy(@Body() data: any) {
    return this.needyService.findOneby(data);
  }

  @Post()
  createcampaign(@Body() data: NeedyDto): any {
    return this.needyService.createNeedy(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateNeedyDto) {
    return this.needyService.update(id, updateRoleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.needyService.delete(id);
  }
}
