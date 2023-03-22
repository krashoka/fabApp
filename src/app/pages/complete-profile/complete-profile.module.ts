import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteProfilePageRoutingModule } from './complete-profile-routing.module';

import { CompleteProfilePage } from './complete-profile.page';
import { AuthSystemNavbarPageModule } from '../../components/auth-system-navbar/auth-system-navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteProfilePageRoutingModule,
    AuthSystemNavbarPageModule,
  ],
  declarations: [CompleteProfilePage],
})
export class CompleteProfilePageModule {}
