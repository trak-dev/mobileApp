import { Table, Model, Column, AllowNull } from 'sequelize-typescript'


interface OrderModel {
  id?: number
  user_id: number
  basket_id: number
  address: string
  payed: boolean
  delivered: boolean
}

@Table
export default class order extends Model<OrderModel> {
  
    @AllowNull(false) @Column
    declare user_id: number

    @AllowNull(false) @Column
    declare basket_id: number

    @AllowNull(false) @Column
    declare address: string

    @Column
    declare payed: boolean

    @Column
    declare delivered: boolean 
  
}