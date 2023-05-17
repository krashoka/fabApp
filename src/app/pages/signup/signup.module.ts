import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { AuthSystemNavbarPageModule } from '../../components/auth-system-navbar/auth-system-navbar.module';
import { Select2Module } from 'ng-select2-component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SignupPageRoutingModule,
    AuthSystemNavbarPageModule,
    Select2Module,
  ],
  declarations: [SignupPage],
})
export class SignupPageModule {}
