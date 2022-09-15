export default class OrderModel {
    id?: number
    user_id: number
    basket_id: number
    address: string
    payed?: boolean
    delivered?: boolean
  }