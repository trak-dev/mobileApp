import { Component, OnInit } from '@angular/core';
import UserModel from 'src/app/models/user.model';
import { GlobalService } from 'src/app/services/global/global.service';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private _global: GlobalService, private _account: AccountsService, private _toast: ToastrService) { }

  user : UserModel = new UserModel();
  async ngOnInit(): Promise<void> {
    this.user = await this._account.getbyToken(this._global.token);
    console.log(this.user);
  }

  async saveEdit() {
    try {
      await this._account.update(this.user);
      this._global.user = this.user;
      this._toast.success("Vos informations ont été mises à jour", "Succès");
    } catch (error) {
      console.error(error);
      this._toast.error("Une erreur est survenue", "Erreur");
    }
  }

}
