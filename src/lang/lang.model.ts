import { ApiProperty } from '@nestjs/swagger';
import { Model, Column, Table, DataType } from 'sequelize-typescript';

interface ILangCreationAttrs {
  name: string;
}

@Table({ tableName: 'langs' })
export class Langs extends Model<Langs, ILangCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique key value' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ukrainian', description: 'Lang name' })
  @Column({
    type: DataType.STRING,
    // unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'ua-UA', description: 'Unique lang code' })
  @Column({
    type: DataType.STRING(10),
    unique: true,
    allowNull: false,
  })
  code: string;

  @ApiProperty({ example: 'Українська', description: 'Lang native name' })
  @Column({
    type: DataType.STRING,
    // unique: true,
    // allowNull: false,
  })
  native_name: string;
}
