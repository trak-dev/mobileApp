import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-lost',
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.scss']
})
export class PasswordLostComponent implements OnInit {

  email = "";
  recoverToken = "";
  newPassword = "";
  passwordStrenght = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')

  constructor(private _global: GlobalService, private _toast: ToastrService, private _account: AccountsService, private _aroute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this._global.user.id || localStorage.getItem("token")) {
      window.location.href = "/home";
    }

    if (this._aroute.snapshot.queryParamMap.get('token')) {
      this.recoverToken = this._aroute.snapshot.queryParamMap.get('token')!;
    }

    }

  async recoverPassword() {
    if (this.email) {
      try {
        await this._account.recoverPassword(this.email);
        this._toast.success("Un email vous a été envoyé", "Succès");
      } catch (error : any) {
        console.warn(typeof error.error === "string");
        if (typeof error.error === "string") {
          this._toast.error(error.error, "Erreur");
        } else {
          this._toast.error( "Une erreur est survenue", "Erreur");
        }
      }
    } else {
      this._toast.error("Veuillez renseigner un email", "Erreur");
    }
  }

  async resetPassword() {
    if (this.newPassword && this.recoverToken) {
      if (!this.passwordStrenght.test(this.newPassword)) return this._toast.error("Mot de passe trop faible", "Erreur");
      try {
        const loginData = await this._account.resetPassword(this.recoverToken, this.newPassword);  
        console.log(loginData);      
        this._global.user = loginData.user;
        localStorage.setItem("token", loginData.token);
        window.location.href = "/home";
      } catch (error : any) {
        console.warn(typeof error.error === "string");
        if (typeof error.error === "string") {
          this._toast.error(error.error, "Erreur");
        } else {
          this._toast.error( "Une erreur est survenue", "Erreur");
        }
      } finally {
        return
      }
    } else {
      this._toast.error("Erreur");
      return
    }
  }

}
