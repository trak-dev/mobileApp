import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import  BasketModel  from '../../models/basket.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  carts : BasketModel[] = [];

  constructor (private _cartService: CartService, private _toast: ToastrService, private _router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      const carts = await this._cartService.getCart();
      this.carts = carts.filter(cart => !cart.ordered);
      console.log(carts);
    } catch (error) {
      console.error(error);
    }
  }

  async placeOrder(cart: BasketModel) {
    try {
      await this._cartService.placeOrder(cart.id!);
      this.carts.filter(c => c.id !== cart.id);
      this._router.navigate(['/orders']);
      this._toast.success("La commande a été passée", "Succès");
    } catch (error) {
      console.error(error);
      this._toast.error("Une erreur est survenue", "Erreur");
    }
  }

}
