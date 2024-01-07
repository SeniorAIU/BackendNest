import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { UpdateTransactionDto } from 'src/transaction/dto/transaction.dto';

@Controller('volunteer')
export class VolunteerController {
    constructor(private readonly volunteerService: VolunteerService) {}

    @Get()
    getVolunteer() {
      return this.volunteerService.getVolunteer();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.volunteerService.findOne(id);
    }
  
    @Post('/volunteer/search')
    findOneBy(@Body() data: any) {
      return this.volunteerService.findOneby(data);
    }
  
    @Post()
    createVolunteer(@Body() data: any): any {
      return this.volunteerService.createVolunteer(data);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateTransactionDto) {
      return this.volunteerService.update(id, updateRoleDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.volunteerService.delete(id);
    }
}
