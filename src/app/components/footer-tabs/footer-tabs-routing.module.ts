import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FooterTabsPage } from './footer-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: FooterTabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterTabsPageRoutingModule {}
