import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
import BasketModel from 'src/app/models/basket.model';
import ItemModel from 'src/app/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http: HttpClient, private _global: GlobalService) { }

  async getCart(){
    try {
      const basket = await this._http.get("http://localhost:8080/baskets", {headers: new HttpHeaders().set("Authorization", this._global.token)}).toPromise();
      return basket as BasketModel[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async idToName(id: number) {
    try {
      const item = await this._http.get(`http://localhost:8080/items/${id}`, {headers: new HttpHeaders().set("Authorization", this._global.token)}).toPromise();
      if (item) return (item as ItemModel).name;
      return false;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async placeOrder(basket_id: number) {
    try {
      await this._http.put(`http://localhost:8080/orders`, {basket_id}, {headers: new HttpHeaders().set("Authorization", this._global.token)}).toPromise();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async cancelOrder(basket_id: number) {
    try {
      await this._http.delete(`http://localhost:8080/orders/${basket_id}`, {headers: new HttpHeaders().set("Authorization", this._global.token)}).toPromise();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateQuantity(basket: BasketModel) {
    try {
      await this._http.patch(`http://localhost:8080/baskets`, basket, {headers: new HttpHeaders().set("Authorization", this._global.token)}).toPromise();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
