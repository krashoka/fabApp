import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  notificationCount = 0;
  notifications: any = [];
  userKaId: any;
  // langData: any;

  constructor(
    private router: Router,
    public _apiService: ApiService,
    private toastCtrl: ToastController,
    private storage: Storage,
    private navController: NavController,
    private translateService: TranslateService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
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
    let data = {
      uid: this.userKaId
    }

    console.log("ttttttt:", data);
    this._apiService.clearNotification(data).subscribe((res:any)=>{
      console.log("get View Details:", res);
    });

    // let counter = 0;

    // setTimeout(()=>{
      
    //   let count = setInterval(()=>{
    //     this.ngOnInit();
    //     counter++;
    //     if(counter == 3) clearInterval(count);
    //   }, 100);
    // },100);
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
        if (val != null) {
          this.username = val.username;
          this.userKaId = val.userid;

          // fetching notifications
          this.notificationCount = 0;

          this.notifications = [];
          for(let i=0; i<val.notifications.length; i++){
            if(val.notifications[i].notif_seen_flag == 0){
              this.notificationCount++;
            }
            let notifData = {
              notifTitle: val.notifications[i].notif_msg,
              notifTime: this.timestamp(val.notifications[i].created_at),
              notifFor: val.notifications[i].notif_for,
              aid: val.notifications[i].aid,
              notifFrom: val.notifications[i].notif_from,
              seenFlag: val.notifications[i].notif_seen_flag,
            }

            this.notifications.push(notifData);
          }

          // ////////////////////
          
          setTimeout(()=>{
            setInterval(()=>{
              this.showAccount = true;
              this.showLogin = false;
            }, 100);
          },100);
          

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
                  notifications: res.notifications
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

    this.cdr.detectChanges();
  }

  ngOnInit() {
    let counter = 0;
    setTimeout(()=>{
      
      let count = setInterval(()=>{
        this.fetchAdminData();
        counter++;
        if(counter == 10) clearInterval(count);
      }, 100);
    },100);
    
  }

  isElementActive(routePath: string): boolean {
    return this.router.url.includes(routePath);
  }

  viewDetails(notifFor, aid, notifFrom){
    if(notifFor == 1){
      this.router.navigateByUrl(`/product-details/${aid}-${this.userKaId}`);
      this.onNotificationSelect = !this.onNotificationSelect;
    }

    if(notifFor == 2){
      this.router.navigateByUrl(`/myaccount/ads`);
      this.onNotificationSelect = !this.onNotificationSelect;
    }

    if(notifFor == 3){
      this.router.navigateByUrl(`/product-details/${aid}-${notifFrom}`);
      this.onNotificationSelect = !this.onNotificationSelect;
    }

    if(notifFor == 4){
      this.router.navigateByUrl(`/myaccount/purchases`);
      this.onNotificationSelect = !this.onNotificationSelect;
    }

    if(notifFor == 5){
      this.router.navigateByUrl(`/myaccount/sellings`);
      this.onNotificationSelect = !this.onNotificationSelect;
    }
  }

  goToLogin() {
    this.storage.get('admin').then((val) => {
      if(val!=null){
        this.router.navigate(['home']);
        this.ngOnInit();
      }else{
        this.router.navigate(['login']);
      }
    })
    
  }

  goToHome() {
    this.router.navigate(['home']);
    this.ngOnInit();
  }

  goToStickyAds(datas: any, title: any) {
    this.storage.set('catTitle', title);
    this.router.navigateByUrl(`products/${datas}-${title}`);
    this.ngOnInit();
  }

  goToCommercialAds() {
    this.router.navigate(['commercialads']);
    this.ngOnInit();
  }

  goToAddNewAd() {
    this.router.navigate(['add-new-advertisement']);
    this.ngOnInit();
  }

  goToAccount() {
    this.router.navigateByUrl(`/myaccount`);
    this.onDropdownSelect = !this.onDropdownSelect;
    this.ngOnInit();
  }

  goToMyAccount(segment) {
    this.router.navigateByUrl(`/myaccount/${segment}`);
    this.onDropdownSelect = !this.onDropdownSelect;
    this.ngOnInit();
  }

  timestamp(time) {
    const timestamp = new Date(time).getTime();
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let result;

    if (days > 1) {
      result = `${days} days ago`;
    } else if (days === 1) {
      result = `1 day ago`;
    } else if (hours > 1) {
      result = `${hours} hours ago`;
    } else if (hours === 1) {
      result = `1 hour ago`;
    } else if (minutes > 1) {
      result = `${minutes} minutes ago`;
    } else if (minutes === 1) {
      result = `1 minute ago`;
    } else if (seconds > 5) {
      result = `${seconds} seconds ago`;
    } else {
      result = `just now`;
    }

    return result;
  }
}
