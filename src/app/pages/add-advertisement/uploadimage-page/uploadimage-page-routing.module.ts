import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadimagePagePage } from './uploadimage-page.page';

const routes: Routes = [
  {
    path: '',
    component: UploadimagePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadimagePagePageRoutingModule {}
