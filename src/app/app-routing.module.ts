import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthImplementsGuard } from './guards/auth---implements.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    // canLoad: [AuthImplementsGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'add-new-advertisement',
    loadChildren: () => import('./pages/add-advertisement/add-new-advertisement/add-new-advertisement.module').then( m => m.AddNewAdvertisementPageModule),
    canLoad: [AuthImplementsGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/add-advertisement/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'item-info',
    loadChildren: () => import('./pages/add-advertisement/item-info/item-info.module').then( m => m.ItemInfoPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'uploadimage-page',
    loadChildren: () => import('./pages/add-advertisement/uploadimage-page/uploadimage-page.module').then( m => m.UploadimagePagePageModule)
  },
  {
    path: 'ad-info',
    loadChildren: () => import('./pages/add-advertisement/ad-info/ad-info.module').then( m => m.AdInfoPageModule)
  },
  {
    path: 'personal-info',
    loadChildren: () => import('./pages/add-advertisement/personal-info/personal-info.module').then( m => m.PersonalInfoPageModule)
  },
  {
    path: 'commercialads',
    loadChildren: () => import('./pages/commercialads/commercialads.module').then( m => m.CommercialadsPageModule)
  },
  {
    path: 'navbar',
    loadChildren: () => import('./components/navbar/navbar.module').then( m => m.NavbarPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'auth-system-navbar',
    loadChildren: () => import('./components/auth-system-navbar/auth-system-navbar.module').then( m => m.AuthSystemNavbarPageModule)
  },
  {
    path: 'myaccount',
    loadChildren: () => import('./pages/myaccount/myaccount/myaccount.module').then( m => m.MyaccountPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/myaccount/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'commercial',
    loadChildren: () => import('./pages/commercial/commercial.module').then( m => m.CommercialPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
