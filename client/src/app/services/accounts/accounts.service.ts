import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import UserModel from 'src/app/models/user.model';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private _http: HttpClient, private _global: GlobalService) { }

  async login(email: string, password: string) {
    try {    
      console.log(`${this._global.base_url}/users/login`);  
      const loginData = await this._http.post(`${this._global.base_url}/users/login`, {email, password}).toPromise();
      console.log(loginData);
      return loginData as {token: string, user: UserModel}; 
    } catch (error) {
      throw error;
    }
  }

  async getbyToken(token: string) {
    try {
      const user = await this._http.get(`${this._global.base_url}/users`, {headers: new HttpHeaders().set("Authorization", token)}).toPromise();
      return user as UserModel;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("token");
    this._global.user = new UserModel();
    this._global.token = "";
    window.location.href = "/login";
  }

  async register(user: UserModel) {
    try {
      const registerData = await this._http.post(`${this._global.base_url}/users/register`, user).toPromise();
      return registerData as {token: string, user: UserModel};
    } catch (error) {
      throw error;
    }
  }

  async recoverPassword(email: string) {
    try {
      return await this._http.patch(`${this._global.base_url}/users/recover-password`, {email}).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token: string, password: string) {
    try {
      const loginData = await this._http.patch(`${this._global.base_url}/users/reset-password`, {token, password}).toPromise();
      return loginData as {token: string, user: UserModel};
    } catch (error) {
      throw error;
    }
  }

  async update(user: UserModel) {
    try {
      const updatedUser = await this._http.patch(`${this._global.base_url}/users/${user.id}`, user, {headers: new HttpHeaders().set("Authorization", this._global.token)}).toPromise();
      return updatedUser as UserModel;
    } catch (error) {
      throw error;
    }
  }
}
