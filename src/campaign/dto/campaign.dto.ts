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
  description: string;

  @IsOptional()
  @IsNumber()
  rate: number;

  @IsNotEmpty()
  @IsString()
  licenseNumber: string;

  @IsString()
  @IsUUID()
  orgId: string;

  @IsOptional()
  donation: number;

}

export class UpdateCampaignDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  @IsNumber()
  target: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsDateString()
  startTime: Date;

  @IsOptional()
  @IsDateString()
  endTime: Date;

  @IsOptional()
  @IsEnum(PeroriyEnum)
  preority: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: string;

  @IsOptional()
  @IsArray()
  category?: Array<string>;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  feedback: string;

  @IsOptional()
  rate: number;

  @IsOptional()
  licenseNumber: string;

  @IsOptional()
  org_id: string;

  @IsOptional()
  donation: number;

}
