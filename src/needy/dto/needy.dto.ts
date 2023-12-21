// import { PeroriyEnum } from 'src/enum/perority-enum';
// import { StatusEnum } from 'src/enum/status-enum';
import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';
import { Expose } from 'class-transformer';

export class NeedyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  age: string;

  @IsOptional()
  @IsNotEmpty()
  @Expose({ name: 'phoneNumber' })
  phoneNumber: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  job: string;

  @IsNotEmpty()
  @IsIn(['Approved', 'Rejected', 'Pending'])
  status: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}

export class UpdateNeedyDto {
  @IsOptional()
  name: string;
  @IsOptional()
  age: string;
  @IsOptional()
  phoneNumber: string;
  @IsOptional()
  address: string;
  @IsOptional()
  job: string;
  @IsOptional()
  status: string;
  @IsOptional()
  email: string;
}
