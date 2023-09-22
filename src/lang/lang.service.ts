import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CommonDBRequest } from 'src/utils/validation/helpers/CommonDBRequest';
import { CreateLangDto } from './dto/create-lang-dto';
import { Lang } from './lang.model';

@Injectable()
export class LangService {
  constructor(@InjectModel(Lang) private langModel: typeof Lang) {}

  async createLang(dto: CreateLangDto) {
    const [lang, created] = await this.langModel.findOrCreate({
      where: {
        [Op.or]: [{ code: dto.code }],
      },
      defaults: {
        ...dto,
      },
    });

    if (!created) {
      throw new ConflictException('Language is already existed');
    }

    return lang;
  }

  async getAllLangs() {
    // const langs = await this.langModel.findAll({
    //   order: ['id'],
    //   attributes: { exclude: ['createdAt', 'updatedAt'] },
    // });
    // return langs;

    return await CommonDBRequest.getAll(Lang);
  }

  // async getLangById(id: number) {
  //   // const lang = await this.langModel.findByPk(id, {
  //   //   attributes: { exclude: ['createdAt', 'updatedAt'] },
  //   // });

  //   // if (!lang) {
  //   //   throw new NotFoundException('Language not found');
  //   // }

  //   // return lang;

  // //   return await CommonDBRequest.getOne(Lang, id, {
  // //     notFoundEntityName: 'Brand',
  // // });
  //}
}
