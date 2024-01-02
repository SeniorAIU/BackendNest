import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto, UpdateTransactionDto } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  getcampaign() {
    return this.transactionService.getTransaction();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Post('/transaction/search')
  findOneBy(@Body() data: any) {
    return this.transactionService.findOneby(data);
  }

  @Post()
  createTransaction(@Body() data: TransactionDto): any {
    return this.transactionService.createTransaction(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateTransactionDto) {
    return this.transactionService.update(id, updateRoleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionService.delete(id);
  }
}
