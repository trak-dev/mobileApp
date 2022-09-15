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
      const loginData = await this._http.post("http://localhost:8080/users/login", {email, password}).toPromise();
      console.log(loginData);
      return loginData as {token: string, user: UserModel}; 
    } catch (error) {
      throw error;
    }
  }

  async getbyToken(token: string) {
    try {
      const user = await this._http.get("http://localhost:8080/users", {headers: new HttpHeaders().set("Authorization", token)}).toPromise();
      return user as UserModel;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("token");
    this._global.user = new UserModel();
    window.location.href = "/login";
  }

  async register(user: UserModel) {
    try {
      const registerData = await this._http.post("http://localhost:8080/users/register", user).toPromise();
      return registerData as {token: string, user: UserModel};
    } catch (error) {
      throw error;
    }
  }

  async recoverPassword(email: string) {
    try {
      return await this._http.patch("http://localhost:8080/users/recover-password", {email}).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token: string, password: string) {
    try {
      const loginData = await this._http.patch("http://localhost:8080/users/reset-password", {token, password}).toPromise();
      return loginData as {token: string, user: UserModel};
    } catch (error) {
      throw error;
    }
  }
}
