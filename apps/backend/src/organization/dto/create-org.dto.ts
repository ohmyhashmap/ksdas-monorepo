import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrgDto {
  @ApiProperty({ example: 'Struktur Organisasi IT Del 2026' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'https://minio.kampus.ac.id/bucket/struktur.png' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}