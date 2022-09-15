import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  visibleSidebar5 = false;

  constructor( private _global: GlobalService, private _account: AccountsService) { }

  ngOnInit(): void {
}

logout() {
  this._account.logout();
}

}
