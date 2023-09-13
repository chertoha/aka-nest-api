import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Brand } from './brands.model';
import { CreateBrandDto } from './dto/create-brand-dto';
import { UpdateBrandDto } from './dto/update-brand-dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

  async createBrand(dto: CreateBrandDto) {
    const [brand, created] = await this.brandModel.findOrCreate({
      where: {
        [Op.or]: [{ name: dto.name }, { descriptor: dto.descriptor }],
      },
      defaults: {
        ...dto,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!created) {
      throw new ConflictException('Brand is already exist');
    }

    return brand;
  }

  async getAllBrands() {
    return [];
  }

  async getBrandById(id: number) {
    return id;
  }

  async updateBrand(id: number, dto: UpdateBrandDto) {
    return { id, dto };
  }

  async deleteBrand(id: number) {
    return id;
  }
}
