import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

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

  @Post()
  createUsers(@Body() data: UserDto): any {
    console.log(data);
    return this.userService.createUsers(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UserDto) {
    return this.userService.update(id, updateRoleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
