import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommercialPageRoutingModule } from './commercial-routing.module';

import { CommercialPage } from './commercial.page';

import {NavbarPageModule} from '../../components/navbar/navbar.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommercialPageRoutingModule,
    NavbarPageModule
  ],
  declarations: [CommercialPage]
})
export class CommercialPageModule {}
