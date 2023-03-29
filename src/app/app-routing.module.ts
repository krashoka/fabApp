import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthImplementsGuard } from './guards/auth---implements.guard';
import { HomeGuard } from './guards/home.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.module').then(
        (m) => m.ProductsPageModule
      ),
  },
  {
    path: 'products/:slug',
    loadChildren: () =>
      import('./pages/products/products.module').then(
        (m) => m.ProductsPageModule
      ),
  },
  {
    path: 'product-details',
    loadChildren: () =>
      import('./pages/product-details/product-details.module').then(
        (m) => m.ProductDetailsPageModule
      ),
  },
  {
    path: 'add-new-advertisement',
    loadChildren: () =>
      import(
        './pages/add-advertisement/add-new-advertisement/add-new-advertisement.module'
      ).then((m) => m.AddNewAdvertisementPageModule),
    canLoad: [AuthImplementsGuard],
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/add-advertisement/categories/categories.module').then(
        (m) => m.CategoriesPageModule
      ),
    canLoad: [AuthImplementsGuard],
  },
  {
    path: 'categories/:slug',
    loadChildren: () =>
      import('./pages/add-advertisement/categories/categories.module').then(
        (m) => m.CategoriesPageModule
      ),
    canLoad: [AuthImplementsGuard],
  },
  {
    path: 'item-info',
    loadChildren: () =>
      import('./pages/add-advertisement/item-info/item-info.module').then(
        (m) => m.ItemInfoPageModule
      ),
    canLoad: [AuthImplementsGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
    canLoad: [HomeGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canLoad: [HomeGuard],
  },
  {
    path: 'uploadimage-page',
    loadChildren: () =>
      import(
        './pages/add-advertisement/uploadimage-page/uploadimage-page.module'
      ).then((m) => m.UploadimagePagePageModule),
    canLoad: [AuthImplementsGuard],
  },
  {
    path: 'ad-info',
    loadChildren: () =>
      import('./pages/add-advertisement/ad-info/ad-info.module').then(
        (m) => m.AdInfoPageModule
      ),
    canLoad: [AuthImplementsGuard],
  },
  {
    path: 'personal-info',
    loadChildren: () =>
      import(
        './pages/add-advertisement/personal-info/personal-info.module'
      ).then((m) => m.PersonalInfoPageModule),
    canLoad: [AuthImplementsGuard],
  },
  {
    path: 'commercialads',
    loadChildren: () =>
      import('./pages/commercialads/commercialads.module').then(
        (m) => m.CommercialadsPageModule
      ),
  },
  {
    path: 'navbar',
    loadChildren: () =>
      import('./components/navbar/navbar.module').then(
        (m) => m.NavbarPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
    canLoad: [HomeGuard],
  },
  {
    path: 'auth-system-navbar',
    loadChildren: () =>
      import('./components/auth-system-navbar/auth-system-navbar.module').then(
        (m) => m.AuthSystemNavbarPageModule
      ),
  },
  {
    path: 'myaccount',
    loadChildren: () =>
      import('./pages/myaccount/myaccount/myaccount.module').then(
        (m) => m.MyaccountPageModule
      ),
    canLoad: [AuthImplementsGuard],
  },
  {
    path: 'myaccount/:slug',
    loadChildren: () =>
      import('./pages/myaccount/myaccount/myaccount.module').then(
        (m) => m.MyaccountPageModule
      ),
    canLoad: [AuthImplementsGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/myaccount/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
    canLoad: [AuthImplementsGuard],
  },
  {
    path: 'footer-tabs',
    loadChildren: () =>
      import('./components/footer-tabs/footer-tabs.module').then(
        (m) => m.FooterTabsPageModule
      ),
  },
  {
    path: 'complete-profile',
    loadChildren: () =>
      import('./pages/complete-profile/complete-profile.module').then(
        (m) => m.CompleteProfilePageModule
      ),
    canLoad: [HomeGuard],
  },
  {
    path: 'floating-chat',
    loadChildren: () =>
      import('./components/floating-chat/floating-chat.module').then(
        (m) => m.FloatingChatPageModule
      ),
  },
  {
    path: 'choose-plan',
    loadChildren: () =>
      import('./pages/add-advertisement/choose-plan/choose-plan.module').then(
        (m) => m.ChoosePlanPageModule
      ),
    canLoad: [AuthImplementsGuard],
  },
  {
    path: 'my-points',
    loadChildren: () =>
      import('./pages/myaccount/my-points/my-points.module').then(
        (m) => m.MyPointsPageModule
      ),
    canLoad: [AuthImplementsGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
