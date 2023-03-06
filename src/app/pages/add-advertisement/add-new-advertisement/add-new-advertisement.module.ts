import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewAdvertisementPageRoutingModule } from './add-new-advertisement-routing.module';

import { AddNewAdvertisementPage } from './add-new-advertisement.page';

import { PipesModule } from './safe.module';
import {NavbarPageModule} from '../../../components/navbar/navbar.module';
import { DataService } from 'src/app/data.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    AddNewAdvertisementPageRoutingModule,
    NavbarPageModule
  ],
  declarations: [AddNewAdvertisementPage],
  providers: [DataService]
})
export class AddNewAdvertisementPageModule {}
