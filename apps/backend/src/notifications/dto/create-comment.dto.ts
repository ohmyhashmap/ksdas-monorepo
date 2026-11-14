import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'uuid-document-123' })
  @IsUUID()
  @IsNotEmpty()
  documentId: string;

  @ApiProperty({ example: 'Tolong perbarui tanggal berakhirnya ya' })
  @IsString()
  @IsNotEmpty()
  content: string;
}