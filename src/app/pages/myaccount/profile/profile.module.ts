import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

import {NavbarPageModule} from '../../../components/navbar/navbar.module';
import { FooterTabsPageModule } from '../../../components/footer-tabs/footer-tabs.module';
import { FloatingChatPageModule } from '../../../components/floating-chat/floating-chat.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    NavbarPageModule,
    FooterTabsPageModule,
    FloatingChatPageModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
