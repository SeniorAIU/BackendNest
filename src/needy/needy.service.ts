import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Needy } from './entities/needy.entity';
import { NeedyDto, UpdateNeedyDto } from './dto/needy.dto';

@Injectable()
export class NeedyService {
  constructor(
    @Inject('NEEDY_REPOSITORY')
    private needyRepository: Repository<Needy>,
  ) {}

  async getNeedy() {
    const result = await this.needyRepository.find();
    return result;
  }

  async createNeedy(data: NeedyDto): Promise<any> {
    const user = await this.needyRepository.save(data);
    return user;
  }

  async findOne(id: string) {
    const result = await this.needyRepository.findOneBy({ id });
    console.log(result);
    return result;
  }

  findOneby(data: any) {
    return this.needyRepository.findBy(data);
  }

  update(id: string, updateNeedyDto: UpdateNeedyDto) {
    return this.needyRepository.update(id, updateNeedyDto);
  }

  delete(id: string) {
    return this.needyRepository.delete(id);
  }
}
