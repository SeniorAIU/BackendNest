import { Inject, Injectable } from '@nestjs/common';
import { Campaign } from './entities/compaign.entity';
import { Repository } from 'typeorm';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';

@Injectable()
export class CampaignService {
  constructor(
    @Inject('CAMPAIGN_REPOSITORY')
    private campaingRepository: Repository<Campaign>,
  ) {}

  async getcampaign() {
    const result = await this.campaingRepository.find();
    return result;
  }

  async createcampaign(data: CreateCampaignDto): Promise<any> {
    const user = await this.campaingRepository.save(data);
    return user;
  }

  async findOne(id: string) {
    const result = await this.campaingRepository.findOneBy({ id });
    console.log(result);
    return result;
  }

  findOneby(data: any) {
    return this.campaingRepository.findBy(data);
  }

  update(id: string, updateCampaignDto: UpdateCampaignDto) {
    return this.campaingRepository.update(id, updateCampaignDto);
  }

  delete(id: string) {
    return this.campaingRepository.delete(id);
  }
}
