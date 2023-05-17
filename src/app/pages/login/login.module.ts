import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { AuthSystemNavbarPageModule } from '../../components/auth-system-navbar/auth-system-navbar.module';
import { Select2Module } from 'ng-select2-component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LoginPageRoutingModule,
    AuthSystemNavbarPageModule,
    Select2Module,
  ],
  declarations: [LoginPage],
  providers: [Storage],
})
export class LoginPageModule {}
