import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalInfoPageRoutingModule } from './personal-info-routing.module';

import { PersonalInfoPage } from './personal-info.page';
import { NavbarPageModule } from '../../../components/navbar/navbar.module';
import { Select2Module } from 'ng-select2-component';
import { FloatingChatPageModule } from '../../../components/floating-chat/floating-chat.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalInfoPageRoutingModule,
    NavbarPageModule,
    Select2Module,
    FloatingChatPageModule,
  ],
  declarations: [PersonalInfoPage],
})
export class PersonalInfoPageModule {}
