import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class OppertunityDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @Expose()
  location: string;

  @IsOptional()
  requirment: Array<string>;

  @IsOptional()
  volunteers: number;

  @IsOptional()
  volunteers_target: number;

  @IsOptional()
  start_date: string;

  @IsOptional()
  end_date: string;

  @IsOptional()
  type: string;

  @IsOptional()
  license: string;

  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  image: string;

  @IsOptional()
  orgId: string;
}

export class UpdateOppertunityDto {
  @IsOptional()
  title: string;
  @IsOptional()
  description: string;
  @IsOptional()
  location: string;
  @IsOptional()
  requirment: Array<string>;
  @IsOptional()
  start_date: string;
  @IsOptional()
  end_date: string;
  @IsOptional()
  type: string;
  @IsOptional()
  status: string;
  @IsOptional()
  license: string;
  @IsOptional()
  note: string;
  @IsOptional()
  image:string;
  @IsOptional()
  volunteers: number;
  @IsOptional()
  volunteers_target: number;

}
