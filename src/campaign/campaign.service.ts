import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Campaign } from './entities/compaign.entity';
import { Between, Repository, FindOperator  } from 'typeorm';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CampaignService {
  constructor(
    @Inject('CAMPAIGN_REPOSITORY')
    private campaingRepository: Repository<Campaign>,
  ) {}
  
  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateCampaignStatuses() {
    const campaigns = await this.campaingRepository.find();
    const currentDate = new Date();

    campaigns.forEach(async (campaign) => {
      if((campaign.target - campaign.donation) == 0 ){
        campaign.status = "Approved"
        await this.campaingRepository.save(campaign)
        return{message:"You on Target amount ", status:500}
      }
      if (currentDate > campaign.endTime && campaign.status !== 'Canceled') {
        await this.campaingRepository.update(campaign.id, { status: 'Canceled' });
      }
    });
  }

  async getcampaign() {
    const result = await this.campaingRepository.find();
    return result;
  }

  async createcampaign(data: CreateCampaignDto): Promise<any> {
    const currentDate = new Date();
    if(currentDate < data.startTime){
      throw new HttpException('ERROR IN TIME', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if(data.endTime < data.startTime){
      throw new HttpException('ERROR IN TIME', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const user = await this.campaingRepository.save(data);
    return user;
  }

  async findOne(id: string) {
    const result = await this.campaingRepository.findOneBy({ id });
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

  async findAllSortedByIdAndColumn(data: any, id: string) {
    return this.campaingRepository.find({
      where: {
        orgId: id,
      },
      order: {
        [data.column]: data.sort,
      },
    });
  }

  async getTotalAmount(id: string): Promise<number> {
    const entitiesWithSameId = await this.campaingRepository.find({
      where: {
        orgId: id,
      },
    });
  
    return entitiesWithSameId.reduce((total, entity) => total + entity.amount, 0);
  }

  async getAmountsByYear(year: number, id: string): Promise<number> {
    const startDate: FindOperator<Date> = Between(
      new Date(`${year}-01-01T00:00:00Z`),
      new Date(`${year}-12-31T23:59:59Z`),
    );

    const campaingYear = await this.campaingRepository.find({
      where: {
        createdAt: startDate,
        orgId:id
      },
    });
    const amounts  = campaingYear.map((campaing) => campaing.amount);
    const total = amounts.reduce((acc, amount) => acc + amount, 0);
    return total ;
  }

  async getAmountsByMonth(year: number, month: number, id: string): Promise<number> {
    if (isNaN(month) || month < 1 || month > 12) {
      throw new Error('Invalid month value');
    }
    const dateString = `${year}-${month.toString().padStart(2, '0')}-01T00:00:00Z`;
    console.log('Generated Date String:', dateString);
    let monthNumber = Number(month)
    let muns = monthNumber
    let yearNumber = Number(year)
    let years = yearNumber
    if(muns == 12){
      console.log("Hello")
      muns = 0
      years = years + 1
    }
    const lastDayOfMonth = new Date(`${years}-${(muns+1).toString().padStart(2, '0')}-01T00:00:00Z`);
    lastDayOfMonth.setMilliseconds(lastDayOfMonth.getMilliseconds() - 1);
    console.log('Generated Date String:', lastDayOfMonth);
  
    const startDate: FindOperator<Date> = Between(
      new Date(dateString),
      lastDayOfMonth,
    );
  
    const campaignMonth = await this.campaingRepository.find({
      where: {
        createdAt: startDate,
        orgId: id,
      },
    });  
    const amounts = campaignMonth.map((campaign) => campaign.amount);
    const total = amounts.reduce((acc, amount) => acc + amount, 0);
  
    return total;
  }
  // async getAmountsByMonth(year: number, month: number, id: string): Promise<number> {
  //   console.log(month)
  //   console.log(month)
  //   console.log(month)
  //   console.log(month)
  //   if (isNaN(month) || month < 0 || month > 12) {
  //     throw new Error('Invalid month value');
  //   }
  //   if(month == 0){
  //     month = 12
  //     year = Number(year)-1
  //   }
  //   const dateString = `${year}-${month.toString().padStart(2, '0')}-01T00:00:00Z`;
  //   console.log('Generated Date String:', dateString);
  //   let num = Number(month)-1
  //   if(num == 0)
  //     {
  //       console.log("dfdasddfdasddfdasddfdasd")
  //       num = 12
  //       year = Number(year)-1
  //     }
  //   // console.log(Number(month)-1)
  //   const lastDayOfMonth = new Date(`${year}-${(num).toString().padStart(2, '0')}-01T00:00:00Z`);
  //   console.log('Generated Date String:', lastDayOfMonth);

  //   lastDayOfMonth.setMilliseconds(lastDayOfMonth.getMilliseconds() - 1);
  
  //   const startDate: FindOperator<Date> = Between(
  //     new Date(dateString),
  //     lastDayOfMonth,
  //   );
  
  //   const campaignMonth = await this.campaingRepository.find({
  //     where: {
  //       createdAt: startDate,
  //       orgId: id,
  //     },
  //   });
  
  //   console.log(campaignMonth);
  
  //   const amounts = campaignMonth.map((campaign) => campaign.amount);
  //   console.log('amounts')
  //   console.log(amounts)
  //   console.log(amounts)
  //   const total = amounts.reduce((acc, amount) => acc + amount, 0);
  
  //   return total;
  // }
  
  
  
}
