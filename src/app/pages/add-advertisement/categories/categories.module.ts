import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { NavbarPageModule } from '../../../components/navbar/navbar.module';
import { DataService } from 'src/app/data.service';
import { FloatingChatPageModule } from '../../../components/floating-chat/floating-chat.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    NavbarPageModule,
    FloatingChatPageModule,
  ],
  declarations: [CategoriesPage],
  providers: [DataService],
})
export class CategoriesPageModule {}
