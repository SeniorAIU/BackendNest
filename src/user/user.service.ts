import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export type Userd = any;

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  getUsers(): any {
    return this.userRepository.find();
  }
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async createUsers(data: UserDto): Promise<any> {
    const user = await this.userRepository.save(data);
    return user;
  }

  findOneby(data: any) {
    return this.userRepository.findBy(data);
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async findOnes(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  update(id: string, updateRoleDto: UserDto) {
    return this.userRepository.update(id, updateRoleDto);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }

  async findAllSortedByColumn(data: any) {
    return this.userRepository.find({
      order: {
        [data.column]: data.sort,
      },
    });
  }

}
