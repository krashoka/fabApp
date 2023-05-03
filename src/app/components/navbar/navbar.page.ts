import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {
  showAccount = false;
  showLogin = true;
  username: any;
  engFlag = false;
  arabicFlag = true;
  // langData: any;

  constructor(
    private router: Router,
    public _apiService: ApiService,
    private toastCtrl: ToastController,
    private storage: Storage,
    private navController: NavController,
    private translateService: TranslateService,
    private http: HttpClient
  ) {
    this.storage.create();
    // this.translateService.use('en');
    this.translateService.setDefaultLang('en');
  }

  translate(event) {
    this.translateService.use(event);
    this.engFlag = !this.engFlag;
    this.arabicFlag = !this.arabicFlag;
    let lang = { lang: event };
    this.storage.set('changeLang', lang);
  }

  // Change direction from ltr to rtl in arabic language
  // changeDirection() {
  //   this._apiService.direction$.subscribe((value) => {
  //     const direction = value === 'ltr' ? 'rtl' : 'ltr';
  //     this._apiService.setDirection(direction);
  //   });
  // }

  // My Account SideMenu
  onDropdownSelect = false;
  openMyAccountTab() {
    this.onDropdownSelect = !this.onDropdownSelect;
    this.ngOnInit();
  }

  dismissSideMenu() {
    this.onDropdownSelect = !this.onDropdownSelect;
  }

  // My Notification SideMenu
  onNotificationSelect = false;
  openNotificationTab() {
    this.onNotificationSelect = !this.onNotificationSelect;
  }

  dismissNotification() {
    this.onNotificationSelect = !this.onNotificationSelect;
  }

  logout() {
    this.storage.remove('admin');

    this.storage.get('admin').then((value) => {
      if (value == null) {
        this.router.navigate(['login']);
        this.showAccount = false;
        this.showLogin = true;
      }
    });

    this.onDropdownSelect = !this.onDropdownSelect;
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

  fetchAdminData() {
    this.storage.get('admin').then(
      (val) => {
        if(val != null){
          
        let data = {
          uid: val.userid,
        };

        this._apiService.fetchAdminData(data).subscribe(
          (res: any) => {
            if (res == 'code-1') {
              this.errorToast('User not found');
            } else if (res == 'code-0') {
              this.errorToast('Session Error');
            } else {
              let newData = {
                loggedIn: true,
                username: res.username,
                userid: res.userid,
                phonecode: res.phonecode,
                usermob: res.mobile,
                referral: res.myref,
                myPoints: res.mypoints,
              };
              this.storage.set('admin', newData);
            }
          },
          (err) => {
            console.log(err);
          }
        );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.fetchAdminData();

    this.storage.get('admin').then((val) => {
      if (val != null) {
        this.username = val.username;
        this.showAccount = true;
        this.showLogin = false;
      }
    });

    // const value = await this.storage.get('admin');
    // if (value != null) {
    //   this.showAccount = true;
    //   this.showLogin = false;
    // }
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
    this.router.navigateByUrl(`products/${datas}-${title}`);
  }

  goToCommercialAds() {
    this.router.navigate(['commercialads']);
  }

  goToAddNewAd() {
    this.router.navigate(['add-new-advertisement']);
  }

  goToAccount() {
    this.router.navigateByUrl(`/myaccount`);
    this.onDropdownSelect = !this.onDropdownSelect;
  }

  goToMyAccount(segment) {
    this.router.navigateByUrl(`/myaccount/${segment}`);
    this.onDropdownSelect = !this.onDropdownSelect;
  }
}
