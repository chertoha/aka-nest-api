import { ConflictException, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { ModelCtor, Sequelize } from 'sequelize-typescript';
import { CommonException } from 'src/exceptions/common.exception';

type GetOneOptions = {
  notFoundEntityName: string;
};

type DeleteOptions = {
  model: ModelCtor<any>;
  id: number;
  sequelizeInstance: Sequelize;
  options?: { notFoundEntityName: string };
};

type UpdateOptions<T> = {
  model: ModelCtor<any>;
  id: number;
  sequelizeInstance: Sequelize;
  whereConditions?: any[];
  dto: T;
  options?: { entityName: string };
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
    const data = await model.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!data) {
      this.throwNotFoundException(options?.notFoundEntityName, id);
    }

    return data;
  }

  static async update<T>({
    model,
    sequelizeInstance,
    id,
    whereConditions = [],
    dto,
    options,
  }: UpdateOptions<T>) {
    try {
      const result = await sequelizeInstance.transaction(async (t) => {
        const data = await model.findByPk(id, {
          transaction: t,
        });

        if (!data) {
          this.throwNotFoundException(options?.entityName, id);
        }

        const existingData = await model.findOne({
          where: {
            [Op.and]: [{ id: { [Op.not]: id } }, { [Op.or]: whereConditions }],
          },
          transaction: t,
        });

        if (existingData) {
          throw new ConflictException(
            `${options?.entityName} is already existed`,
          );
        }

        const updatedData = await data.update({ ...dto }, { transaction: t });

        return updatedData.get();
      });
      return result;
    } catch (err) {
      throw new CommonException(err.message, err.status);
    }
  }

  static async delete({
    model,
    sequelizeInstance,
    id,
    options,
  }: DeleteOptions) {
    try {
      const result = await sequelizeInstance.transaction(async (t) => {
        const data = await model.findByPk(id, {
          transaction: t,
        });

        if (!data) {
          this.throwNotFoundException(options?.notFoundEntityName, id);
        }

        const deletedData = data.get();
        await data.destroy({ transaction: t });

        return deletedData;
      });
      return result;
    } catch (err) {
      throw new CommonException(err.message, err.status);
    }
  }

  private static throwNotFoundException(entityName: string, id: number) {
    throw new NotFoundException(`${entityName || 'Data'} id=${id} not found'`);
  }
}
