import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthSystemNavbarPageRoutingModule } from './auth-system-navbar-routing.module';

import { AuthSystemNavbarPage } from './auth-system-navbar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthSystemNavbarPageRoutingModule,
  ],
  declarations: [AuthSystemNavbarPage],
  exports: [AuthSystemNavbarPage],
})
export class AuthSystemNavbarPageModule {}
