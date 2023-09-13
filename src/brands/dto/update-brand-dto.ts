import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Speedy block',
    description: 'Brand unique name',
    required: true,
  })
  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly name: string;

  @ApiProperty({
    example: 'speedy_block',
    description: 'Brand unique descriptor',
    required: true,
  })
  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly descriptor: string;
}
