import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { adverImage } from './entities/adver-image.entity';

@Injectable()
export class AdverImageService {
  constructor(
    @Inject('ADVERIMAGE_REPOSITORY')
    private adverImageRepository: Repository<adverImage>,
  ) {}

  async getAdverImage() {
    const result = await this.adverImageRepository.find();
    return result;
  }

  async createAdverImage(data: any) {
    const user = await this.adverImageRepository.save(data);
    return user;
  }

  async findOne(id: string) {
    const result = await this.adverImageRepository.findOneBy({ id });
    console.log(result);
    return result;
  }

  findOneby(data: any) {
    return this.adverImageRepository.findBy(data);
  }

  delete(id: string) {
    return this.adverImageRepository.delete(id);
  }
}
