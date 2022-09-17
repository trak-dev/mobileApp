import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';
import { ItemsService } from 'src/app/services/items/items.service';
import ItemModel from 'src/app/models/item.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  image: any;
  items : ItemModel[] = [];

  constructor( private _global: GlobalService, private _items: ItemsService, private _toast: ToastrService) { }

  async ngOnInit(){
    try {      
      const items = await this._items.getItems();
      console.log(items)
      this.items = items;
    } catch (error) {
      console.error(error);
    }
  }

async addToCart(item: ItemModel){
  try {
    await this._items.addToCart(item.id!, 1);
    this._toast.success("L'objet a été ajouté au panier", "Succès");
    const itemModified = this.items.find(i => i.id === item.id);
    // @ts-ignore
    itemModified.quantity--;
  } catch (error) {
    console.error(error);
    this._toast.error("Une erreur est survenue", "Erreur");
  }
}

}
