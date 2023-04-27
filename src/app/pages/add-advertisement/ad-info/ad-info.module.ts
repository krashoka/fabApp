import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdInfoPageRoutingModule } from './ad-info-routing.module';

import { AdInfoPage } from './ad-info.page';
import { NavbarPageModule } from '../../../components/navbar/navbar.module';
import { FloatingChatPageModule } from '../../../components/floating-chat/floating-chat.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AdInfoPageRoutingModule,
    NavbarPageModule,
    FloatingChatPageModule,
  ],
  declarations: [AdInfoPage],
})
export class AdInfoPageModule {}
