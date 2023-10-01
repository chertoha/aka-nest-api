import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CommonException } from 'src/exceptions/common.exception';
import { CommonDBRequest } from 'src/utils/validation/helpers/CommonDBRequest';
import { CreateLangDto } from './dto/create-lang-dto';
import { UpdateLangDto } from './dto/update-lang-dto';
import { Lang } from './lang.model';

@Injectable()
export class LangService {
  constructor(
    @InjectModel(Lang) private langModel: typeof Lang,
    private sequelize: Sequelize,
  ) {}

  async createLang(dto: CreateLangDto) {
    // const [lang, created] = await this.langModel.findOrCreate({
    //   where: {
    //     [Op.or]: [{ code: dto.code }],
    //   },
    //   defaults: {
    //     ...dto,
    //   },
    // });

    // if (!created) {
    //   throw new ConflictException('Language is already existed');
    // }

    // return lang;

    return await CommonDBRequest.create({
      dto,
      model: Lang,
      sequelizeInstance: this.sequelize,
      whereConditions: [{ code: dto.code }],
      options: { entityName: 'Language' },
    });
  }

  async getAllLangs() {
    // const langs = await this.langModel.findAll({
    //   order: ['id'],
    //   attributes: { exclude: ['createdAt', 'updatedAt'] },
    // });
    // return langs;

    return await CommonDBRequest.getAll(Lang);
  }

  async getLangById(id: number) {
    // const lang = await this.langModel.findByPk(id, {
    //   attributes: { exclude: ['createdAt', 'updatedAt'] },
    // });
    // if (!lang) {
    //   throw new NotFoundException('Language not found');
    // }
    // return lang;d
    return await CommonDBRequest.getOne(Lang, id, {
      notFoundEntityName: 'Language',
    });
  }

  async updateLang(id: number, dto: UpdateLangDto) {
    const whereConditions = [];
    if (dto.code) {
      whereConditions.push({ code: dto.code });
    }

    return await CommonDBRequest.update<UpdateLangDto>({
      model: Lang,
      sequelizeInstance: this.sequelize,
      id,
      whereConditions,
      dto,
      options: { entityName: 'Language' },
    });

    // try {
    //   const result = await this.sequelize.transaction(async (t) => {
    //     const lang = await this.langModel.findByPk(id, {
    //       transaction: t,
    //     });

    //     if (!lang) {
    //       throw new NotFoundException('Lang not found');
    //     }

    //     const whereConditions = [];
    //     if (dto.code) {
    //       whereConditions.push({ code: dto.code });
    //     }

    //     const existinglang = await this.langModel.findOne({
    //       where: {
    //         [Op.and]: [{ id: { [Op.not]: id } }, { [Op.or]: whereConditions }],
    //       },
    //       transaction: t,
    //     });

    //     if (existinglang) {
    //       throw new ConflictException('Lang code is already existed');
    //     }

    //     const updatedLang = await lang.update({ ...dto }, { transaction: t });

    //     return updatedLang.get();
    //   });
    //   return result;
    // } catch (err) {
    //   throw new CommonException(err.message, err.status);
    // }
  }

  async deleteLang(id: number) {
    return await CommonDBRequest.delete({
      model: Lang,
      sequelizeInstance: this.sequelize,
      id,
      options: { notFoundEntityName: 'Lang' },
    });
  }
}
