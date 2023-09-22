import { NotFoundException } from '@nestjs/common';
import { ModelCtor } from 'sequelize-typescript';

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
}
