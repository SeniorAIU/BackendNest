import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { Order } from 'src/order/entities/order.entity';

export class CartDto {
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  @IsIn(['Approved', 'Rejected', 'Pending'])
  status: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  orderId: string;
}

export class UpdateUserDto {
  @IsOptional()
  amount: number;

  @IsOptional()
  status: string;
}
