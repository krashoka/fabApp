import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloatingChatPage } from './floating-chat.page';

const routes: Routes = [
  {
    path: '',
    component: FloatingChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloatingChatPageRoutingModule {}
