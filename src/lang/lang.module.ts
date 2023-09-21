import { Module } from '@nestjs/common';
import { LangController } from './lang.controller';
import { LangService } from './lang.service';

@Module({
  controllers: [LangController],
  providers: [LangService],
})
export class LangModule {}
