import { Table, Model, Column, AllowNull  } from 'sequelize-typescript'


interface PersonModel {
  id?: number
  first_name: string
  last_name: string
  email: string
}

@Table
export default class Person extends Model<PersonModel> {
  
  @Column({primaryKey: true}) 
  id!: number 
  
  @Column
  first_name!: string
  
  @Column
  last_name!: string
  
  @AllowNull(false) @Column
  email!: string 
  
}