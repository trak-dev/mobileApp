import { Table, Model, Column, AllowNull  } from 'sequelize-typescript'


interface UserModel {
  id?: number
  firstname: string
  lastname: string
  email: string
  password: string
  pseudo: string
}

@Table
export default class User extends Model<UserModel> {
  
  @Column({primaryKey: true}) 
  id!: number 
  
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