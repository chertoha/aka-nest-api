import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandsService } from './brands.service';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Post()
  create() {}

  @Get()
  getAll() {}

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {}

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {}

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {}
}
