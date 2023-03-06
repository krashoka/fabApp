import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewAdvertisementPage } from './add-new-advertisement.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewAdvertisementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewAdvertisementPageRoutingModule {}
