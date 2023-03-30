import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { PipesModule } from './safe.module';

import { HomePageRoutingModule } from './home-routing.module';

import { NavbarPageModule } from '../../components/navbar/navbar.module';
import { FooterTabsPageModule } from '../../components/footer-tabs/footer-tabs.module';
import { FloatingChatPageModule } from '../../components/floating-chat/floating-chat.module';
import { Select2Module } from 'ng-select2-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    HomePageRoutingModule,
    NavbarPageModule,
    FooterTabsPageModule,
    FloatingChatPageModule,
    Select2Module,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
