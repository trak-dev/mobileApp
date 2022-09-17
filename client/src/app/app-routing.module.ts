import { AdminComponent } from './pages/admin/admin.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PasswordLostComponent } from './pages/password-lost/password-lost.component';
import { AuthGuardService } from './services/authGuard/auth-guard.service';
import { AccountComponent } from './pages/account/account.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login" },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  { path: "register", component: RegisterComponent},
  { path: "product/:id", component: ProductComponent, canActivate: [AuthGuardService] },
  { path: "cart", component: CartComponent, canActivate: [AuthGuardService] },
  { path: "password-lost", component: PasswordLostComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuardService] },
  { path: "account", component: AccountComponent, canActivate: [AuthGuardService] },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
