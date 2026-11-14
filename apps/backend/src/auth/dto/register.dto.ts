import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'admin@del.ac.id' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 1, description: '1: Admin, 2: WR, 3: Dekan, 4: Kaprodi, 5: Dosen' })
  @IsInt()
  roleId: number;

  @ApiProperty({ example: 'uuid-fakultas', required: false })
  @IsOptional()
  @IsString()
  facultyId?: string;

  @ApiProperty({ example: 'uuid-prodi', required: false })
  @IsOptional()
  @IsString()
  prodiId?: string;
}