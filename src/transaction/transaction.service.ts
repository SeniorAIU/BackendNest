import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { Campaign } from 'src/campaign/entities/compaign.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>, 
    @Inject('CAMPAIGN_REPOSITORY') 
    private campaginRepository: Repository<Campaign>,
    @Inject('USER_REPOSITORY') 
    private userRepository: Repository<User>
  ) {}

  async getTransaction() {
    const result = await this.transactionRepository.find();
    return result;
  }

  async createTransaction(data: TransactionDto) {
    const campId = data.campId
    const usreId = data.userId
    const orderId = data.orderId
    const user = await this.userRepository.findOneBy({id:usreId})
    if(campId){
      const campaign = await this.campaginRepository.findOneBy({id:campId})
      if(!campaign){
        return {message: "campaign id not exist", status:500}
      }
      campaign.amount = campaign.amount + data.amount
      if(campaign.amount > campaign.target){
        return {message: "you can`t donate above campaign target", status:500}
      }
      await this.campaginRepository.save(campaign)
      const result = await this.transactionRepository.save(data);
      user.amountDonate = user.amountDonate + data.amount;
      await this.userRepository.save(user)
      return result;
    }
    if(orderId){
      const transaction = await this.transactionRepository.save(data);
      return {data:transaction , status:200}
 
    }
    // return campaign
  }

  async findOne(id: string) {
    const result = await this.transactionRepository.findOneBy({ id });
    console.log(result);
    return result;
  }

  findOneby(data: any) {
    return this.transactionRepository.findBy(data);
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionRepository.update(id, updateTransactionDto);
  }

  delete(id: string) {
    return this.transactionRepository.delete(id);
  }
}
