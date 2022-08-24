import { Table, Model, Column, PrimaryKey, AllowNull } from 'sequelize-typescript'


interface UserModel {
  id: string
  firstname: string
  lastname: string
  email: string
  password: string
  pseudo: string
}

@Table
export default class User extends Model<UserModel> {
  
  @PrimaryKey @Column 
  id!: string 
  
  @AllowNull(false) @Column
  firstname!: string
  
  @AllowNull(false) @Column
  lastname!: string
  
  @AllowNull(false) @Column
  email!: string
  
  @AllowNull(false) @Column
  password!: string
  
  @Column
  pseudo!: string  
  
}