import { Injectable } from '@angular/core';
import UserModel from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  user : UserModel = new UserModel();
  token = `Bearer ${localStorage.getItem('token')}`;

  constructor() { }
}
