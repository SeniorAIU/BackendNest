import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class OrgDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  address: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  image: string;

  @IsOptional()
  @IsNotEmpty()
  @Expose({ name: 'phoneNumber' })
  phoneNumber: string;

  @IsNotEmpty()
  instituteNumber: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  licenseNumber: string;

  @IsNotEmpty()
  @IsIn(['Approved', 'Rejected', 'Pending'])
  status: string;
}

export class UpdateOrgDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  description: string;

  @IsOptional()
  address: string;

  @IsOptional()
  image: string;

  @IsOptional()
  @IsNotEmpty()
  @Expose({ name: 'phoneNumber' })
  phoneNumber: string;

  @IsOptional()
  instituteNumber: string;

  @IsOptional()
  type: string;

  @IsOptional()
  licenseNumber: string;

  @IsOptional()
  @IsIn(['Approved', 'Rejected', 'Pending'])
  status: string;
}
