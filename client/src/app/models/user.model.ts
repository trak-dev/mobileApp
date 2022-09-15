export default class UserModel {
    id?: number
    firstname: string
    lastname: string
    email: string
    password: string
    password_token?: string
    pseudo?: string
    isadmin?: boolean
  }