import { IsString, IsOptional } from 'class-validator';

export class CommentsDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  userId: string
}
