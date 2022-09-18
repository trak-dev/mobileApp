import { Injectable } from '@angular/core';
import UserModel from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  user : UserModel = new UserModel();
  base_url = "http://157.230.121.251";
  token = `Bearer ${localStorage.getItem('token')}`;

  constructor() { }
}
