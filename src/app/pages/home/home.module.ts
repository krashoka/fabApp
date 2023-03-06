import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { PipesModule } from './safe.module';

import { HomePageRoutingModule } from './home-routing.module';

import {NavbarPageModule} from '../../components/navbar/navbar.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    HomePageRoutingModule,
    NavbarPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
