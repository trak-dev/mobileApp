import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductComponent } from './pages/product/product.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { PasswordLostComponent } from './pages/password-lost/password-lost.component'; 
import { SidebarModule } from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from "primeng/dropdown";
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './pages/account/account.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { ItemIdToStringPipe } from './pipes/item-id-to-string.pipe';
import { OrdersComponent } from './pages/orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CartComponent,
    AdminComponent,
    ProductComponent,
    NotFoundComponent,
    RegisterComponent,
    PasswordLostComponent,
    AccountComponent,
    NavbarComponent,
    ItemIdToStringPipe,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    PasswordModule,
    DividerModule,
    FormsModule,
    AccordionModule,
    BrowserAnimationsModule,
    SidebarModule,
    DataViewModule,
    RatingModule,
    DropdownModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    HttpClientModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
