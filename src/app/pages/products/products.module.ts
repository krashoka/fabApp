import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';

import { NavbarPageModule } from '../../components/navbar/navbar.module';
import { FooterTabsPageModule } from '../../components/footer-tabs/footer-tabs.module';
import { FloatingChatPageModule } from '../../components/floating-chat/floating-chat.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    NavbarPageModule,
    FooterTabsPageModule,
    FloatingChatPageModule,
  ],
  declarations: [ProductsPage],
})
export class ProductsPageModule {}
