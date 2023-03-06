import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommercialadsPageRoutingModule } from './commercialads-routing.module';

import { CommercialadsPage } from './commercialads.page';
import {NavbarPageModule} from '../../components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommercialadsPageRoutingModule,
    NavbarPageModule
  ],
  declarations: [CommercialadsPage]
})
export class CommercialadsPageModule {}
