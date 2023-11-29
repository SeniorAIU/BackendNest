import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  birthDate: Date;

  @IsOptional()
  @IsIn(['MALE', 'FEMALE'])
  gender: string;

  @IsOptional()
  job: string;

  @IsOptional()
  @IsNotEmpty()
  @Expose({ name: 'phoneNumber' })
  phoneNumber: string;

  @IsNotEmpty()
  habbies: Array<string>;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  country: string;

  @IsOptional()
  fakeName: string;

  @IsNotEmpty()
  @IsIn(['Approved', 'Rejected', 'Pending'])
  status: string;

}
