import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadimagePagePageRoutingModule } from './uploadimage-page-routing.module';

import { UploadimagePagePage } from './uploadimage-page.page';
import { FloatingChatPageModule } from '../../../components/floating-chat/floating-chat.module';
import { NavbarPageModule } from '../../../components/navbar/navbar.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    UploadimagePagePageRoutingModule,
    NavbarPageModule,
    FloatingChatPageModule,
  ],
  declarations: [UploadimagePagePage],
})
export class UploadimagePagePageModule {}
