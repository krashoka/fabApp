import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommercialadsPage } from './commercialads.page';

const routes: Routes = [
  {
    path: '',
    component: CommercialadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommercialadsPageRoutingModule {}
