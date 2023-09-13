import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({
    example: 'Speedy block',
    description: 'Brand unique name',
    required: true,
  })
  @IsString()
  @MaxLength(30)
  readonly name: string;

  @ApiProperty({
    example: 'speedy_block',
    description: 'Brand unique descriptor',
    required: true,
  })
  @IsString()
  @MaxLength(30)
  readonly descriptor: string;
}
