import { PeroriyEnum } from 'src/enum/perority-enum';
import { StatusEnum } from 'src/enum/status-enum';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsEnum,
  IsOptional,
  IsArray,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateCampaignDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  target: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  note: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  @IsNotEmpty()
  @IsEnum(PeroriyEnum)
  preority: string;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: string;

  @IsOptional()
  @IsArray()
  category?: Array<string>;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  feedback: string;

  @IsNotEmpty()
  @IsNumber()
  rate: number;

  @IsNotEmpty()
  @IsString()
  licenseNumber: string;
}
