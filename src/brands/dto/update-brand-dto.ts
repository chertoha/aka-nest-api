import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class UpdateBrandDto {
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
  @Matches(/^[a-z_]+$/, {
    message: `descriptor is a string in lower case with only low dash '_' accepted symbol`,
  })
  @IsOptional()
  readonly descriptor: string;
}
