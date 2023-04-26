import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPointsPageRoutingModule } from './my-points-routing.module';

import { MyPointsPage } from './my-points.page';
import { NavbarPageModule } from '../../../components/navbar/navbar.module';
import { FooterTabsPageModule } from '../../../components/footer-tabs/footer-tabs.module';
import { FloatingChatPageModule } from '../../../components/floating-chat/floating-chat.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MyPointsPageRoutingModule,
    NavbarPageModule,
    FooterTabsPageModule,
    FloatingChatPageModule,
  ],
  declarations: [MyPointsPage],
})
export class MyPointsPageModule {}
