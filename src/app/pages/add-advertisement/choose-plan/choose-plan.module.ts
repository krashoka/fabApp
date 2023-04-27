import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosePlanPageRoutingModule } from './choose-plan-routing.module';

import { ChoosePlanPage } from './choose-plan.page';
import { NavbarPageModule } from '../../../components/navbar/navbar.module';
import { FloatingChatPageModule } from '../../../components/floating-chat/floating-chat.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ChoosePlanPageRoutingModule,
    NavbarPageModule,
    FloatingChatPageModule,
  ],
  declarations: [ChoosePlanPage],
})
export class ChoosePlanPageModule {}
