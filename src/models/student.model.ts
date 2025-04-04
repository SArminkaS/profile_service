
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

  @Column({
    validate:{
      notEmpty:{msg: 'Name cannot be empty!'},
      notNull:{msg:'You must specify a name!'},
    },
    allowNull:false
  })
  name: string;

  @Column(
    {
      validate:{
        isEmail:{msg: 'Invalid email format!'},
        notEmpty:{msg: 'Email cannot be empty!'},
        notNull:{msg:'You must specify an email!'}
      },
      allowNull:false
    }
  )
  email: string;
}