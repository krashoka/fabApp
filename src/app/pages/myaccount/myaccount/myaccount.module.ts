import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyaccountPageRoutingModule } from './myaccount-routing.module';

import { MyaccountPage } from './myaccount.page';
import {NavbarPageModule} from '../../../components/navbar/navbar.module';
import { FooterTabsPageModule } from '../../../components/footer-tabs/footer-tabs.module';
import { FloatingChatPageModule } from '../../../components/floating-chat/floating-chat.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyaccountPageRoutingModule,
    NavbarPageModule,
    FooterTabsPageModule,
    FloatingChatPageModule
  ],
  declarations: [MyaccountPage]
})
export class MyaccountPageModule {}
