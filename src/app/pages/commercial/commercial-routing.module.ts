import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommercialPage } from './commercial.page';

const routes: Routes = [
  {
    path: '',
    component: CommercialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommercialPageRoutingModule {}
