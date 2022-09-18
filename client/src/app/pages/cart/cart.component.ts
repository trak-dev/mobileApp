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

  cart : BasketModel = new BasketModel();

  constructor (private _cartService: CartService, private _toast: ToastrService, private _router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      const carts = await this._cartService.getCart();
      this.cart = carts.filter((cart: BasketModel) => !cart.ordered )[0];
    } catch (error) {
      console.error(error);
    }
  }

  async placeOrder(cart: BasketModel) {
    try {
      await this._cartService.placeOrder(cart.id!);
      this._router.navigate(['/orders']);
      this._toast.success("La commande a été passée", "Succès");
    } catch (error) {
      console.error(error);
      this._toast.error("Une erreur est survenue", "Erreur");
    }
  }

  async updateQuantity() {
    try {
      await this._cartService.updateQuantity(this.cart);
      for (let item of this.cart.items) {
        if (item.quantity === 0) {
          this.cart.items.splice(this.cart.items.indexOf(item), 1);
        }
      }
      if (this.cart.items.length === 0) {
        this._router.navigate(['/home']);
      }
      this._toast.success("La quantité a été mise à jour", "Succès");
    } catch (error: any) {
      console.error(error);
      if (typeof error.error === "string") {
        this._toast.error(error.error, "Erreur");
      } else {
      this._toast.error("Une erreur est survenue", "Erreur");
      }
    }
  }

}
