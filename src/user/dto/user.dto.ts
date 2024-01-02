import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  birthDate: Date;

  @IsOptional()
  @IsIn(['MALE', 'FEMALE'])
  gender: string;

  @IsOptional()
  job: string;

  @IsNotEmpty()
  @Expose({ name: 'phoneNumber' })
  phoneNumber: string;

  @IsOptional()
  habbies: Array<string>;

  @IsNotEmpty()
  @IsIn(['Donate', 'Volunteer'])
  type: string;

  @IsOptional()
  address: string;

  @IsOptional()
  country: string;

  @IsOptional()
  amountDonate: number;

  @IsOptional()
  fakeName: string;

  @IsNotEmpty()
  @IsIn(['Approved', 'Rejected', 'Pending'])
  status: string;
}


export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  birthDate: Date;

  @IsOptional()
  @IsIn(['MALE', 'FEMALE'])
  gender: string;

  @IsOptional()
  job: string;

  @IsOptional()
  @Expose({ name: 'phoneNumber' })
  phoneNumber: string;

  @IsOptional()
  habbies: Array<string>;

  @IsOptional()
  @IsIn(['Donate', 'Volunteer'])
  type: string;

  @IsOptional()
  address: string;

  @IsOptional()
  country: string;

  @IsOptional()
  amountDonate: number;

  @IsOptional()
  fakeName: string;

  @IsOptional()
  @IsIn(['Approved', 'Rejected', 'Pending'])
  status: string;
}
