import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PipesModule } from './safe.module';

import { ItemInfoPageRoutingModule } from './item-info-routing.module';

import { ItemInfoPage } from './item-info.page';
import { NavbarPageModule } from '../../../components/navbar/navbar.module';
import { Select2Module } from 'ng-select2-component';
import { FloatingChatPageModule } from '../../../components/floating-chat/floating-chat.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    ItemInfoPageRoutingModule,
    NavbarPageModule,
    Select2Module,
    FloatingChatPageModule,
  ],
  declarations: [ItemInfoPage],
})
export class ItemInfoPageModule {}
