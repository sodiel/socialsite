import { $Enums, Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  idempotencyKey: string;

  status: $Enums.PostStatus;
}
