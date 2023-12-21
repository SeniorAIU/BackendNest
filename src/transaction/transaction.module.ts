import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { transactionProviders } from './transaction.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...transactionProviders, TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
