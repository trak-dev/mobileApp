export default class BasketModel {
    id?: number
    user_id: number
    items: { id: number, quantity: number }[]
    ordered?: boolean
    hidden?: boolean
  }