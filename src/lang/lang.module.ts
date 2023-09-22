import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LangController } from './lang.controller';
import { Lang } from './lang.model';
import { LangService } from './lang.service';

@Module({
  controllers: [LangController],
  providers: [LangService],
  imports: [SequelizeModule.forFeature([Lang])],
})
export class LangModule {}
