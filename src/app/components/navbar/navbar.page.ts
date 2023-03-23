import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {
  showAccount = false;
  showLogin = true;
  username: any;

  constructor(
    private router: Router,
    public _apiService: ApiService,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.storage.get('admin').then((val) => {
      console.log('SessionVal:', val);
      if (val != null) {
        this.storage.create();
        this.username = val.username;
      }
    });
  }

  onDropdownSelect = false;
  openMyAccountTab() {
    this.onDropdownSelect = !this.onDropdownSelect;
  }

  dismissSideMenu() {
    this.onDropdownSelect = !this.onDropdownSelect;
  }

  logout() {
    this.storage.remove('admin');
    this.storage.get('admin').then((value) => {
      if (value == null) {
        this.router.navigate(['login']);
      }
    });
  }

  async errorToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',
      cssClass: 'errorToast',
    });
    toast.present();
  }

  async successToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',
      cssClass: 'successToast',
    });
    toast.present();
  }

  ngOnInit() {
    this.storage.get('admin').then((value) => {
      if (value != null) {
        console.log('Session value is', value.userid);
        this.showAccount = true;
        this.showLogin = false;
      }
    });
  }

  isElementActive(routePath: string): boolean {
    return this.router.url.includes(routePath);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToStickyAds(datas: any, title: any) {
    this.storage.set('catTitle', title);
    this.router.navigateByUrl(`products/${datas}`);
  }

  goToCommercialAds() {
    this.router.navigate(['commercialads']);
  }

  goToAddNewAd() {
    this.storage.get('admin').then((value) => {
      if (value != null) this.router.navigate(['add-new-advertisement']);
      else this.router.navigate(['login']);
    });
  }
}
