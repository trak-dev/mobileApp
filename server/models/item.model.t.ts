import { Table, Model, Column, AllowNull } from 'sequelize-typescript'


interface ItemModel {
  id?: number
  name: string
  description: string
  price: number
  quantity: number
  picture: string
}

@Table
export default class item extends Model<ItemModel> {
  
    @AllowNull(false) @Column
    declare name: string

    @Column
    declare description: string

    @AllowNull(false) @Column
    declare price: number

    @AllowNull(false) @Column
    declare quantity: number

    @AllowNull(false) @Column
    declare picture: string  
  
}