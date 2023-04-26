import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommercialadsPageRoutingModule } from './commercialads-routing.module';

import { CommercialadsPage } from './commercialads.page';
import { FooterTabsPageModule } from '../../components/footer-tabs/footer-tabs.module';
import { NavbarPageModule } from '../../components/navbar/navbar.module';
import { FloatingChatPageModule } from '../../components/floating-chat/floating-chat.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CommercialadsPageRoutingModule,
    NavbarPageModule,
    FooterTabsPageModule,
    FloatingChatPageModule,
  ],
  declarations: [CommercialadsPage],
})
export class CommercialadsPageModule {}
