
import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName:'students'
})
export class Student extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  id1;

  @Column
  name: string;

  @Column
  email: string;
}