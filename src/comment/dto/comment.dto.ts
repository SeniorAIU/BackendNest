import { IsString, IsOptional } from 'class-validator';

export class CommentsDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  rate: string;

  @IsOptional()
  userId: string;

  @IsOptional()
  camId: string;
}
