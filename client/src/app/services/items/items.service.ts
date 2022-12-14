import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
import ItemModel from 'src/app/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private _http: HttpClient, private _global: GlobalService) { }

  async getItems() {
    try {
      return (await this._http.get(`${this._global.base_url}/items`, {headers: new HttpHeaders().set("Authorization", this._global.token!)}).toPromise()) as ItemModel[];
    } catch (error) {
      console.error(error);
      throw "Error getting items";
    }
  }

  async addToCart(object_id: number, quantity: number) {
    try {
      return (await this._http.post(`${this._global.base_url}/baskets`, {object_id, quantity}, {headers: new HttpHeaders().set("Authorization", this._global.token!)}).toPromise()) as ItemModel[];
    } catch (error) {
      console.error(error);
      throw "Error adding to cart";
    }
  }
}
