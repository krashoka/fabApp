import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdInfoPage } from './ad-info.page';

const routes: Routes = [
  {
    path: '',
    component: AdInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdInfoPageRoutingModule {}
