import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe as BuiltInValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Brand } from './brands.model';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand-dto';
import { UpdateBrandDto } from './dto/update-brand-dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @ApiOperation({ summary: 'Create new brand' })
  @ApiResponse({ status: 201, type: Brand })
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.createBrand(createBrandDto);
  }

  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: 200, type: [Brand] })
  @Get()
  getAll() {
    return this.brandService.getAllBrands();
  }

  @ApiOperation({ summary: 'Get brand by id' })
  @ApiResponse({ status: 200, type: Brand })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.getBrandById(id);
  }

  @ApiOperation({ summary: 'Update brand' })
  @ApiResponse({ status: 200, type: Brand })
  @Patch(':id')
  @UsePipes(
    new BuiltInValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.updateBrand(id, updateBrandDto);
  }

  @ApiOperation({ summary: 'Delete brand' })
  @ApiResponse({ status: 200, type: Brand })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.deleteBrand(id);
  }
}
