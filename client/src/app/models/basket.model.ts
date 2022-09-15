export default class BasketModel {
    id?: number
    user_id: number
    items: { id: number, quantity: number }[] | string
    ordered?: boolean
    hidden?: boolean
  }