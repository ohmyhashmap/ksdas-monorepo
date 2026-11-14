import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({ 
    example: false, 
    description: 'Status aktif akun (true untuk aktif, false untuk blokir)' 
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}