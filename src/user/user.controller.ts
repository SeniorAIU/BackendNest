import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): string {
    return this.userService.getUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('/user/search')
  findOneBy(@Body() data: any) {
    return this.userService.findOneby(data);
  }

  @Post()
  createUsers(@Body() data: UserDto): any {
    console.log(data);
    return this.userService.createUsers(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateUserDto) {
    return this.userService.update(id, updateRoleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Post('/search/order')
  async findAllSortedByType(@Body() sortByDto: any) {
    return this.userService.findAllSortedByColumn(sortByDto);
  }

  @Post(':id/campaign/:campid/Donation')
  donation(@Param('id') id: string, @Param('campid') campid: string,@Body() data:any) {
    return this.userService.donation(id,campid, data);
  }

  @Get('verifyEmail/:username/:code')
  async verifyEmail(@Param('username') username: string, @Param('code') code: string) {
    try {
      const result = await this.userService.verifyEmail(username, code);
      return { success: true, message: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
