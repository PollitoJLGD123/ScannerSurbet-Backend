import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate } from 'sequelize-typescript';
import { encryptPassword } from '../lib/encrypt';

@Table({
  tableName: 'users'
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nombres!: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  apellidos!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  correo!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  pais!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  codPais!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  celular!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  active!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BeforeCreate
  static async hashPassword(instance: User) {
    if (instance.password) {
      instance.password = await encryptPassword(instance.password);
    }
  }

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}