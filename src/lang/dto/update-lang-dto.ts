import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateLangDto {
  @ApiProperty({
    example: 'Ukrainian',
    description: 'Language name',
  })
  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly name: string;

  @ApiProperty({
    example: 'ua',
    description: 'Language unique international code',
  })
  @IsString()
  @MaxLength(10)
  @IsOptional()
  readonly code: string;

  @ApiProperty({
    example: 'Українська',
    description: 'Language native name',
  })
  @IsOptional()
  @MaxLength(30)
  readonly native_name: string;
}
