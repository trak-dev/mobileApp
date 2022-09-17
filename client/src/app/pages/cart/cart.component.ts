import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import  BasketModel  from '../../models/basket.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  carts : BasketModel[] = [];

  constructor (private _cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    try {
      const carts = await this._cartService.getCart();
      this.carts = carts;
      console.log(carts);
    } catch (error) {
      console.error(error);
    }
  }

}
