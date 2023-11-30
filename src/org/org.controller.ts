import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrgDto, UpdateOrgDto } from 'src/org/dto/org.dto';
import { OrgService } from './org.service';

@Controller('org')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Get()
  getUsers(): string {
    return this.orgService.getUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orgService.findOne(id);
  }

  @Get('/org/search')
  findOneBy(@Body() data: any) {
    return this.orgService.findOneby(data);
  }

  @Post()
  createUsers(@Body() data: OrgDto): any {
    console.log(data);
    return this.orgService.createUsers(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateOrgDto) {
    return this.orgService.update(id, updateRoleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orgService.delete(id);
  }
}
