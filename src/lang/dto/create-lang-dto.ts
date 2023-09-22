import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLangDto {
  @ApiProperty({
    example: 'Ukrainian',
    description: 'Language name',
    required: true,
  })
  @IsString()
  @MaxLength(30)
  readonly name: string;

  @ApiProperty({
    example: 'ua',
    description: 'Language unique international code',
    required: true,
  })
  @IsString()
  @MaxLength(10)
  readonly code: string;

  @ApiProperty({
    example: 'Українська',
    description: 'Language native name',
    required: false,
  })
  @IsOptional()
  @MaxLength(30)
  readonly native_name: string;
}
