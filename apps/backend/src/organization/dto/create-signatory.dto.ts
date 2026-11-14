import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateSignatoryDto {
  @ApiProperty({ example: 'Dr. Ir. T. MT., M.Sc.' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Rektor' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ example: '2024-01-01', required: false })
  @IsDateString()
  @IsOptional()
  periodStart?: Date;

  @ApiProperty({ example: '2028-12-31', required: false })
  @IsDateString()
  @IsOptional()
  periodEnd?: Date;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}