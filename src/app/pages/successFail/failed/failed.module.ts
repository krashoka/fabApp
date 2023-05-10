import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FailedPageRoutingModule } from './failed-routing.module';

import { FailedPage } from './failed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FailedPageRoutingModule
  ],
  declarations: [FailedPage]
})
export class FailedPageModule {}
