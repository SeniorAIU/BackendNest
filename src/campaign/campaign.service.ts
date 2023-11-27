import { Inject, Injectable } from '@nestjs/common';
import { Campaign } from './entities/compaign.entity';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dto/campaign.dto';

@Injectable()
export class CampaignService {
  constructor(
    @Inject('CAMPAIGN_REPOSITORY')
    private campaingRepository: Repository<Campaign>,
  ) {}

  getcampaign(): any {
    return this.campaingRepository.find();
  }

  async createcampaign(data: CreateCampaignDto): Promise<any> {
    const user = await this.campaingRepository.save(data);
    return user;
  }

  findOne(id: string) {
    return this.campaingRepository.findOneBy({ id });
  }

  update(id: string, updateCampaignDto: CreateCampaignDto) {
    return this.campaingRepository.update(id, updateCampaignDto);
  }

  delete(id: string) {
    return this.campaingRepository.delete(id);
  }
}
