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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLangDto } from './dto/create-lang-dto';
import { Lang } from './lang.model';
import { LangService } from './lang.service';

@ApiTags('Brands')
@Controller('lang')
export class LangController {
  constructor(private langService: LangService) {}

  @ApiOperation({ summary: 'Add language' })
  @ApiResponse({ status: 201, type: Lang })
  @Post()
  create(@Body() createLangDto: CreateLangDto) {
    return this.langService.createLang(createLangDto);
  }

  @ApiOperation({ summary: 'Get all languages' })
  @ApiResponse({ status: 200, type: [Lang] })
  @Get()
  getAll() {
    return this.langService.getAllLangs();
  }

  // @ApiOperation({ summary: 'Get language by id' })
  // @ApiResponse({ status: 200, type: Lang })
  // @Get(':id')
  // getOne(@Param('id', ParseIntPipe) id: number) {
  //   // return this.langService.getLangById(id);
  // }

  // @ApiOperation({ summary: 'Update language' })
  // @ApiResponse({ status: 200, type: Lang })
  // @Patch(':id')
  // //   @UsePipes(
  // //     new BuiltInValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  // //   )
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   // @Body() updateBrandDto: UpdateBrandDto,
  // ) {
  //   // return this.brandService.updateBrand(id, updateBrandDto);
  // }

  // @ApiOperation({ summary: 'Delete language' })
  // @ApiResponse({ status: 200, type: Lang })
  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   // return this.brandService.deleteBrand(id);
  // }
}
