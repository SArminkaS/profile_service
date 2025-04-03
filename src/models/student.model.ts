
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Student extends Model {
  @Column
  id_: string;

  @Column
  name: string;

  @Column
  email: string;
}