import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductModule } from './products/product.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './home/signup/signup.component';
import { StarComponent } from './star/star.component';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { ShellComponent } from './home/shell/shell.component';
import { MenuComponent } from './home/menu/menu.component';
import { UserComponent } from './home/user/user.component';
import { UserModule } from './home/user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    //StarComponent,
    PageNotFoundComponent,
    ShellComponent,
    MenuComponent,
    //UserComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ProductModule,
    HttpModule,
    ReactiveFormsModule,
    CommonModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
