import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooterTabsPageRoutingModule } from './footer-tabs-routing.module';

import { FooterTabsPage } from './footer-tabs.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FooterTabsPageRoutingModule,
  ],
  declarations: [FooterTabsPage],
  exports: [FooterTabsPage],
})
export class FooterTabsPageModule {}
