import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { transactionProviders } from './transaction.provider';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [DatabaseModule,
    ScheduleModule.forRoot(),
    HttpModule.registerAsync({
      useFactory: async () => ({
        baseURL: "https://egate-t.fatora.me/api/",
      }),
    }),],
  providers: [...transactionProviders, TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
