import { Component, OnInit } from '@angular/core';
import UserModel from 'src/app/models/user.model';
import { GlobalService } from '../../services/global/global.service';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: UserModel = { password: "", email: "" , firstname: "", lastname: ""};
  passwordStrenght = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');

  constructor(private _global: GlobalService, private _toast: ToastrService, private _account: AccountsService) { }

  ngOnInit(): void {
    if (this._global.user.id || localStorage.getItem("token")) {
      window.location.href = "/home";
    }
  }

  async register() {
    if (this.user.email && this.user.password && this.user.firstname && this.user.lastname) {
      if (!this.passwordStrenght.test(this.user.password)) return this._toast.error("Mot de passe trop faible");
      try {
        const registerData = await this._account.register(this.user);
        this._global.user = registerData.user;
        localStorage.setItem("token", registerData.token);
        window.location.href = "/home";
      } catch (error: any) {
        console.error(error);
        if (typeof error.error === "string") {
          this._toast.error(error.error);
        } else {
          this._toast.error("Une erreur est survenue");
        }
      }finally {
        return;
      }
  } else {
    this._toast.error("Merci de remplir tout les champs");
    return;
  }
  }
}
