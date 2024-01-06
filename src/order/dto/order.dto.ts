import { StatusEnum } from 'src/enum/status-enum';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: string;

  @IsString()
  @IsUUID()
  orgId: string;

  @IsOptional()
  imageUrl: string;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsNumber()
  price: number;

}
