import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPointsPage } from './my-points.page';

const routes: Routes = [
  {
    path: '',
    component: MyPointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPointsPageRoutingModule {}
