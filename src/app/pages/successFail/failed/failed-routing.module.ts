import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FailedPage } from './failed.page';

const routes: Routes = [
  {
    path: '',
    component: FailedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FailedPageRoutingModule {}
