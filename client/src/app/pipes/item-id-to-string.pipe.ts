import { Pipe, PipeTransform } from '@angular/core';
import { CartService } from '../services/cart/cart.service';

@Pipe({
  name: 'itemIdToString'
})

export class ItemIdToStringPipe implements PipeTransform {

  constructor(private _CartService: CartService) { }

  async transform(value: number, ...args: unknown[]){
    const name = await this._CartService.idToName(value);
    if (name) return name;
    return value;
  }

}
