import { ModelCtor } from 'sequelize-typescript';

export class CommonDBRequest {
  static async getAll(model: ModelCtor<any>) {
    const data = await model.findAll({
      order: ['id'],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return data;
  }
  //   static async getAllmodel<T>(model: typeof T) {
  //     const data = await model.findAll({
  //       order: ['id'],
  //       attributes: { exclude: ['createdAt', 'updatedAt'] },
  //     });
  //     return data;
  //   }
}
