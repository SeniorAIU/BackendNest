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

}
