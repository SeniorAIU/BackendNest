import { Inject, Injectable } from '@nestjs/common';
import { Oppertunity } from './entities/oppertunity.entity';
import { Repository } from 'typeorm';
import { OppertunityDto, UpdateOppertunityDto } from './dto/oppertunity.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class OppertunityService {
  constructor(
    @Inject('OPPERTUNITY_REPOSITORY')
    private oppertunityRepository: Repository<Oppertunity>,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateCampaignStatuses() {
    const OppertunityData = await this.oppertunityRepository.find();
    const currentDate = new Date();

    OppertunityData.forEach(async (Oppertunities) => {
      if((Oppertunities.volunteers_target - Oppertunities.volunteers) == 0 ){
        Oppertunities.status = "Approved"
        await this.oppertunityRepository.save(Oppertunities)
        return{message:"You on Target volunteer ", status:500}
      }
      if (currentDate > Oppertunities.end_date && Oppertunities.status !== 'Canceled') {
        await this.oppertunityRepository.update(Oppertunities.id, { status: 'Canceled' });
      }
      if (currentDate >= Oppertunities.start_date && Oppertunities.status == 'Pending') {
        await this.oppertunityRepository.update(Oppertunities.id, { status: 'Active' });
      } 
    });
  }

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
