import { NotFoundException } from '@nestjs/common';
import { ModelCtor } from 'sequelize-typescript';
import { CommonException } from 'src/exceptions/common.exception';

type GetOneOptions = {
  notFoundEntityName: string;
};

export class CommonDBRequest {
  static async getAll(model: ModelCtor<any>) {
    const data = await model.findAll({
      order: ['id'],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return data;
  }

  static async getOne(
    model: ModelCtor<any>,
    id: number,
    options?: GetOneOptions,
  ) {
    // const { notFoundEntityName } = options;

    const data = await model.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!data) {
      throw new NotFoundException(
        `${options?.notFoundEntityName || 'Data'} not found'`,
      );
    }

    return data;
  }

  // static async delete(
  //   model: ModelCtor<any>,
  //   id: number,
  //   // options?: GetOneOptions,
  // ) {
  //   try {
  //     const result = await this.sequelize.transaction(async (t) => {
  //       const brand = await model.findByPk(id, {
  //         transaction: t,
  //       });

  //       if (!brand) {
  //         throw new NotFoundException('Brand not found');
  //       }

  //       const deletedBrand = brand.get();

  //       await brand.destroy({ transaction: t });

  //       return deletedBrand;
  //     });
  //     return result;
  //   } catch (err) {
  //     throw new CommonException(err.message, err.status);
  //   }
  // }
}
