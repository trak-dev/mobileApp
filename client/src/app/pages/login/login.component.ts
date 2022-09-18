import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password  = "";
  email = "";

  constructor(private _global: GlobalService, private _toast: ToastrService, private _account: AccountsService) { }

  ngOnInit(): void {
    console.log("yes");
    if (this._global.user.id || localStorage.getItem("token")) {
      window.location.href = "/home";
    }
  }
  
  async login() {
    if (this.email && this.password) {
      try {
        const loginData = await this._account.login(this.email, this.password);
        this._global.user = loginData.user;
        localStorage.setItem("token", loginData.token);
        window.location.href = "/home";
      } catch (error : any) {
        console.error(error);
        console.log("azezaeazeazeaze")
        if (typeof error.error === "string") {
          this._toast.error(error.error, "Erreur");
        } else {
          this._toast.error( "Une erreur est survenue", "Erreur");
        }
      }
  }
}

}
