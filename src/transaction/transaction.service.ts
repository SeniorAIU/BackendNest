import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionDto, UpdateTransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getTransaction() {
    const result = await this.transactionRepository.find();
    return result;
  }

  async createTransaction(data: TransactionDto) {
    const user = await this.transactionRepository.save(data);
    return user;
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
