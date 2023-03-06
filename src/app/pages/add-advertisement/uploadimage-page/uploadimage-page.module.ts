import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadimagePagePageRoutingModule } from './uploadimage-page-routing.module';

import { UploadimagePagePage } from './uploadimage-page.page';
import {NavbarPageModule} from '../../../components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadimagePagePageRoutingModule,
    NavbarPageModule
  ],
  declarations: [UploadimagePagePage]
})
export class UploadimagePagePageModule {}
