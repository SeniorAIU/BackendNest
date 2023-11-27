import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  Email: string;

  @Expose({ name: 'birthDate' })
  birth_date: Date;

  @IsOptional()
  @IsIn(['MALE', 'FEMALE'])
  gender: string;

  @IsOptional()
  job: string;

  @IsOptional()
  @IsNotEmpty()
  @Expose({ name: 'phoneNumber' })
  phone_number: string;

  @IsNotEmpty()
  hobbies: Array<string>;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  @IsIn(['Approved', 'Rejected', 'Pending'])
  status: string;

  @Expose({ name: 'fakeName' })
  fake_name: string;
}
