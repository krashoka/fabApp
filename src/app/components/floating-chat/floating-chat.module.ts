import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FloatingChatPageRoutingModule } from './floating-chat-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { FloatingChatPage } from './floating-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FloatingChatPageRoutingModule,
  ],
  declarations: [FloatingChatPage],
  exports: [FloatingChatPage],
})
export class FloatingChatPageModule {}
