import { Table, Model, Column, AllowNull  } from 'sequelize-typescript'


interface UserModel {
  id?: number
  firstname: string
  lastname: string
  email: string
  password: string
  password_token?: string
  pseudo: string
  isadmin?: boolean
}

@Table
export default class user extends Model<UserModel> {
  
  @AllowNull(false) @Column
  declare firstname: string
  
  @AllowNull(false) @Column
  declare lastname: string
  
  @AllowNull(false) @Column
  declare email: string
  
  @AllowNull(false) @Column
  declare password: string

  @Column
  declare pseudo: string 
  
  @Column
  declare password_token: string  

  @Column
  declare isadmin: boolean
  
}