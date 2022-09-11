import { Table, Model, Column, AllowNull } from 'sequelize-typescript'


interface BasketModel {
  id?: number
  user_id: number
  items: { id: number, quantity: number }[]
  ordered: boolean
  hidden: boolean
}

@Table
export default class basket extends Model<BasketModel> {
  
    @AllowNull(false) @Column
    declare user_id: number

    @Column
    declare items: { id: number, quantity: number }[]

    @Column
    declare ordered: boolean

    @Column
    declare hidden: boolean

  
}