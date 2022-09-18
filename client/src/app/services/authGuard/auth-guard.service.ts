import { Injectable } from '@angular/core';
import { AccountsService } from '../accounts/accounts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _account: AccountsService, private _http: HttpClient, private _toast: ToastrService, private _global : GlobalService) { }

  async canActivate(){
    try {
      if (!localStorage.getItem("token")) {
        window.location.href = "/login";
        this._toast.error("Erreur", "Vous n'êtes pas connecté");
        return false;
      }

      const connecionStatus = await this._http.get(`${this._global.base_url}/users/isUserConnected`, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })}).toPromise();

      if (!connecionStatus) {
        window.location.href = "/login";
        this._toast.error("Erreur", "Vous n'êtes pas connecté");
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      this._account.logout();
      this._toast.error("Erreur", "Vous n'êtes pas connecté");
      return false;
    }

  }
}
