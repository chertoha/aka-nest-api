import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength } from 'class-validator';
import { brandDescriptorPattern } from 'src/utils/validation/fieldPatterns';

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
  @Matches(brandDescriptorPattern, {
    message: `descriptor is a string in lower case with only low dash '_' accepted symbol`,
  })
  readonly descriptor: string;
}
