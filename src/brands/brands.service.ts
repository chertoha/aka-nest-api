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
import { Brand } from './brands.model';
import { CreateBrandDto } from './dto/create-brand-dto';
import { UpdateBrandDto } from './dto/update-brand-dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand) private brandModel: typeof Brand,
    private sequelize: Sequelize,
  ) {}

  async createBrand(dto: CreateBrandDto) {
    const [brand, created] = await this.brandModel.findOrCreate({
      where: {
        [Op.or]: [{ name: dto.name }, { descriptor: dto.descriptor }],
      },
      defaults: {
        ...dto,
      },
    });

    if (!created) {
      throw new ConflictException('Brand is already existed');
    }

    return brand;
  }

  async getAllBrands() {
    // const brands = await this.brandModel.findAll({
    //   order: ['id'],
    //   attributes: { exclude: ['createdAt', 'updatedAt'] },
    // });
    // return brands;

    return await CommonDBRequest.getAll(Brand);
  }

  async getBrandById(id: number) {
    // const brand = await this.brandModel.findByPk(id, {
    //   attributes: { exclude: ['createdAt', 'updatedAt'] },
    // });

    // if (!brand) {
    //   throw new NotFoundException('Brand not found');
    // }

    // return brand;

    return await CommonDBRequest.getOne(Brand, id, {
      notFoundEntityName: 'Brand',
    });
  }

  async updateBrand(id: number, dto: UpdateBrandDto) {
    const whereConditions = [];
    if (dto.name) {
      whereConditions.push({ name: dto.name });
    }

    return await CommonDBRequest.update({
      model: Brand,
      sequelizeInstance: this.sequelize,
      id,
      whereConditions,
      dto,
      options: { entityName: 'Brand' },
    });

    // try {
    //   const result = await this.sequelize.transaction(async (t) => {
    //     const brand = await this.brandModel.findByPk(id, {
    //       transaction: t,
    //     });

    //     if (!brand) {
    //       throw new NotFoundException('Brand not found');
    //     }

    //     const existingBrand = await this.brandModel.findOne({
    //       where: {
    //         [Op.and]: [
    //           { id: { [Op.not]: id } },
    //           { [Op.or]: { name: dto.name } },
    //         ],
    //       },
    //       transaction: t,
    //     });

    //     if (existingBrand) {
    //       throw new ConflictException('Brand name already exists');
    //     }

    //     const updatedBrand = await brand.update({ ...dto }, { transaction: t });

    //     return updatedBrand.get();
    //   });
    //   return result;
    // } catch (err) {
    //   throw new CommonException(err.message, err.status);
    // }
  }

  async deleteBrand(id: number) {
    return await CommonDBRequest.delete({
      model: Brand,
      sequelizeInstance: this.sequelize,
      id,
      options: { notFoundEntityName: 'Brand' },
    });

    // try {
    //   const result = await this.sequelize.transaction(async (t) => {
    //     const brand = await this.brandModel.findByPk(id, {
    //       transaction: t,
    //     });
    //     if (!brand) {
    //       throw new NotFoundException('Brand not found');
    //     }
    //     const deletedBrand = brand.get();
    //     await brand.destroy({ transaction: t });
    //     return deletedBrand;
    //   });
    //   return result;
    // } catch (err) {
    //   throw new CommonException(err.message, err.status);
    // }
  }
}
