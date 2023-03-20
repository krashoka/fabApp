import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommercialadsPageRoutingModule } from './commercialads-routing.module';

import { CommercialadsPage } from './commercialads.page';
import { FooterTabsPageModule } from '../../components/footer-tabs/footer-tabs.module';
import { NavbarPageModule } from '../../components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommercialadsPageRoutingModule,
    NavbarPageModule,
    FooterTabsPageModule,
  ],
  declarations: [CommercialadsPage],
})
export class CommercialadsPageModule {}
