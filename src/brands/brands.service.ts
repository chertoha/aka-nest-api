import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './brands.model';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

  async createBrand() {}

  async getAllBrands() {}

  async getBrandById() {}

  async updateBrand() {}

  async deleteBrand() {}
}
