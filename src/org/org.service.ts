import { Inject, Injectable } from '@nestjs/common';
import { OrgDto, UpdateOrgDto } from 'src/org/dto/org.dto';
import { Repository } from 'typeorm';
import { ORG } from './entities/org.entity';

@Injectable()
export class OrgService {
  constructor(
    @Inject('ORG_REPOSITORY')
    private orgRepository: Repository<ORG>,
  ) {}
  getUsers(): any {
    return this.orgRepository.find();
  }

  async createUsers(data: OrgDto): Promise<any> {
    const user = await this.orgRepository.save(data);
    return user;
  }

  findOneby(data: any) {
    return this.orgRepository.findBy(data);
  }

  findOne(id: string) {
    return this.orgRepository.findOneBy({ id });
  }

  findOneEmail(email: string) {
    return this.orgRepository.findOneBy({ email });
  }

  update(id: string, updateRoleDto: UpdateOrgDto) {
    return this.orgRepository.update(id, updateRoleDto);
  }

  delete(id: string) {
    return this.orgRepository.delete(id);
  }
}
