import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthSystemNavbarPage } from './auth-system-navbar.page';

const routes: Routes = [
  {
    path: '',
    component: AuthSystemNavbarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthSystemNavbarPageRoutingModule {}
