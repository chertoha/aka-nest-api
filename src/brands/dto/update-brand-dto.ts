import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { brandDescriptorPattern } from 'src/utils/validation/fieldPatterns';

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

  // @ApiProperty({
  //   example: 'speedy_block',
  //   description: 'Brand unique descriptor',
  //   required: true,
  // })
  // @IsString()
  // @MaxLength(30)
  // @Matches(brandDescriptorPattern, {
  //   message: `descriptor is a string in lower case with only low dash '_' accepted symbol`,
  // })
  // @IsOptional()
  // @Exclude()
  // readonly descriptor: string;
}
