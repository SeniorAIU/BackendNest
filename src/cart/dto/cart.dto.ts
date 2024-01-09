import { IsNotEmpty, IsOptional, IsIn, IsArray } from 'class-validator';
import { UUID } from 'crypto';
import { Order } from 'src/order/entities/order.entity';

export class CartDto {
  @IsOptional()
  amount: number;

  @IsOptional()
  @IsIn(['Approved', 'Rejected', 'Pending'])
  status: string;

  @IsOptional()
  userId: string;

  @IsOptional()
  @IsArray()
  orders: any;
}

export class UpdateCartDto {

  @IsOptional()
  status: string;
}
