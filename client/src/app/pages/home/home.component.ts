import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { DomSanitizer } from '@angular/platform-browser'
import ItemModel from 'src/app/models/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  image: any;
  items : ItemModel[] = [];

  constructor( private _global: GlobalService, private _items: ItemsService, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    try {      
      const items = await this._items.getItems();
      console.log(items)
      this.items = items;
    } catch (error) {
      console.error(error);
    }
  }

}
