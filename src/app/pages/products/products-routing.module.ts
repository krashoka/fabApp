import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
    // data: { breadcrumb: 'Products' },
    // children: [
    //   {
    //     path: ':productId',
    //     component: ProductsPage,
    //     data: {
    //       breadcrumb: (route: ActivatedRoute) => route.params['productId'],
    //     },
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
