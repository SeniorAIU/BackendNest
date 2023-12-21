import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

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
  type: string;

  @IsOptional()
  address: string;

  @IsOptional()
  country: string;

  @IsOptional()
  fakeName: string;

  @IsNotEmpty()
  @IsIn(['Approved', 'Rejected', 'Pending'])
  status: string;
}
