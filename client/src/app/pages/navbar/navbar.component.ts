import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _account: AccountsService) { }
  
  visibleSidebar5 = false;

  ngOnInit(): void {
  }

  logout() {
    this._account.logout();
  }
}
