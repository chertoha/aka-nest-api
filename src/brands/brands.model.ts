import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IBrandCreationAttrs {
  name: string;
  descriptor: string;
}

@Table({ tableName: 'brands' })
export class Brand extends Model<Brand, IBrandCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique key value' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Speedy Block', description: 'Unique brand name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'speedy_block',
    description: 'Unique brand descriptor',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  descriptor: string;
}
