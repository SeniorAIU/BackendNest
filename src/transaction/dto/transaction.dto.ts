import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsIn(['Approved', 'Rejected', 'Pending'])
  status: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  campId: string;
}

export class UpdateTransactionDto {
  @IsOptional()
  amount: number;

  @IsOptional()
  date: string;

  @IsOptional()
  status: string;
}
