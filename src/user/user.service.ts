import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  getUsers(): any {
    return this.userRepository.find();
  }

  async createUsers(data: UserDto): Promise<any> {
    const user = await this.userRepository.save(data);
    return user;
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: string, updateRoleDto: UserDto) {
    return this.userRepository.update(id, updateRoleDto);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }
}
