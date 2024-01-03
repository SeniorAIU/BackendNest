import { Inject, Injectable } from '@nestjs/common';
import { Oppertunity } from './entities/oppertunity.entity';
import { Repository } from 'typeorm';
import { OppertunityDto, UpdateOppertunityDto } from './dto/oppertunity.dto';

@Injectable()
export class OppertunityService {
  constructor(
    @Inject('OPPERTUNITY_REPOSITORY')
    private oppertunityRepository: Repository<Oppertunity>,
  ) {}

  async getNeedy() {
    const result = await this.oppertunityRepository.find();
    return result;
  }

  async createNeedy(data: OppertunityDto) {
    const user = await this.oppertunityRepository.save(data);
    return user;
  }

  async findOne(id: string) {
    const result = await this.oppertunityRepository.findOneBy({ id });
    console.log(result);
    return result;
  }

  findOneby(data: any) {
    return this.oppertunityRepository.findBy(data);
  }

  update(id: string, updateOppertunityDto: UpdateOppertunityDto) {
    return this.oppertunityRepository.update(id, updateOppertunityDto);
  }

  delete(id: string) {
    return this.oppertunityRepository.delete(id);
  }

  async findAllSortedByColumn(data: any) {
    return this.oppertunityRepository.find({
      order: {
        [data.column]: data.sort,
      },
    });
  }

}
