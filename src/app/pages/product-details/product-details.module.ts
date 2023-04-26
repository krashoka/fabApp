import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { NavbarPageModule } from '../../components/navbar/navbar.module';
import { FloatingChatPageModule } from '../../components/floating-chat/floating-chat.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProductDetailsPageRoutingModule,
    NavbarPageModule,
    FloatingChatPageModule,
  ],
  declarations: [ProductDetailsPage],
})
export class ProductDetailsPageModule {}
