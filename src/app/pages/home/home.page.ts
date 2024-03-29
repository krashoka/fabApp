import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';
import { Select2Option } from 'ng-select2-component';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { TranslateService } from '@ngx-translate/core';
// import { SwiperComponent } from 'swiper/types/shared';
import { SharedService } from 'src/app/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public buttonClickSubscription: Subscription;
  // showCommercial= false;
  // showHomeContent = true;
  pageLoaded = false;
  imageUrl: any;
  sessionUser: any;
  commercialImageUrl: string[] = [];

  categories: any = [];

  searchCategories: any = [];
  overlay = false;

  favData: any = [];

  adDetails: any = [];

  showCommercialTitle = false;
  showStickyTitle = false;

  waLink = 'https://wa.me/';

  english = true;
  arabic = false;

  constructor(
    private router: Router,
    public http: HttpClient,
    private toastCtrl: ToastController,
    private storage: Storage,
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private navController: NavController,
    private translate: TranslateService,
    private sharedService: SharedService
  ) {
    this.storage.create();

    // **************** For Categories Icons Section *****************
    this.http.get('https://specbits.com/class2/fab/index').subscribe(
      (res: any) => {
        console.log("categoriesResponse:", res);
        this.categories = res;

        for (let i = 0; i < res.length; i++) {
          let data = {
            options: [{ value: res[i].title, label: res[i].title }],
          };
          this.searchCategories.push(data);

          // if (res[i] == 973) {
          //   this.selectedCountry = this.countries[i].options[0].value;
          // }
        }
      },
      (error: any) => {
        console.log('ErrorMessage: ', error);
      }
    );


    this.buttonClickSubscription = this.sharedService.buttonClicked.subscribe(() => {
      // Update the UI here
      this.storage.get('changeLang').then((val) => {
        if (val) {
          if (val.lang === 'ar') {
            this.english = true;
            this.arabic = false;
          } else if (val.lang === 'en') {
            this.arabic = true;
            this.english = false;
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  search(text: string) {
    this.searchCategories = text
      ? (
          JSON.parse(JSON.stringify(this.searchCategories)) as Select2Option[]
        ).filter(
          (option) =>
            option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      : JSON.parse(JSON.stringify(this.searchCategories));
  }

  onHomeSelect = true;
  homeNotSelect = false;
  onCommercialSelect = false;

  homeTabComponent = true;
  commerceTab = false;

  onCommercialClick() {
    this.onCommercialSelect = true;
    this.onHomeSelect = false;
    this.homeNotSelect = true;
    this.homeTabComponent = false;
    this.commerceTab = true;
  }

  onHomeClick() {
    this.onCommercialSelect = false;
    this.onHomeSelect = true;
    this.homeNotSelect = false;
    this.commerceTab = false;
    this.homeTabComponent = true;
  }

  option = {
    slidesPerView: 1,
    autoplay: true,
  };

  option2 = {
    slidesPerView: 4,
    // centeredSlides: true,
    // loop: true,
    spaceBetween: 40,
    autoplay: true,
  };

  option3 = {
    slidesPerView: 2,
    // centeredSlides: true,
    // loop: true,
    spaceBetween: 2,
    autoplay: true,
  };

  goToSticky(datas: any, titles: any, slug: any) {
    let data = { cid: datas };

    this.storage.set('catTitle', slug);

    this._apiService.sendCategory(data).subscribe((res: any) => {
      // console.log('check empty: ', res);
      if (res == 'empty') {
        this.router.navigate(['home']);
      } else {
        this.router.navigateByUrl(`products/${datas}-${slug}`);
      }
    });

    console.log('homeIconCID:', data);
  }

  goToStickyAds(datas: any, title: any) {
    this.storage.set('catTitle', title);
    this.router.navigateByUrl(`products/${datas}-${title}`);
  }

  goToAddNewAd() {
    this.router.navigate(['add-new-advertisement']);
  }

  goToCommercialAds() {
    this.router.navigate(['commercialads']);
  }

  goToProductDetails(ad) {
    this.router.navigateByUrl(`product-details/${ad.ad_id}-${ad.adAdmin}`);

    // let value = { aid: ad.ad_id, uid: this.sessionUser };
    // this.http
    //   .post('https://specbits.com/class2/fab/fetch-comment', value)
    //   .subscribe((res: any) => {
    //     console.log('chaaaaat:', res);
    //     let data = {
    //       adINFO: ad,
    //       comment: res,
    //     };
    //     this.storage.set('adId', data);
    //     this.router.navigateByUrl(`product-details/${ad.ad_id}`);
    //   });
  }

  addToFavorites(adid, i) {
    let data = {
      uid: this.sessionUser,
      aid: adid,
    };

    this._apiService.addToFavorites(data).subscribe(
      (res: any) => {
        console.log('favRreed:', res);
        if (res == 'success') {
          this.successToast('Added to your Favorites.');
          this.adDetails[i].heartVisible = false;
          this.adDetails[i].heartRedVisible = true;
        } else if (res == 'fail') {
          this.errorToast('Failed adding to your Favorites!');
        } else if (res == 'noadd') {
          this.errorToast('Error finding ad!');
        } else {
          this.errorToast('Please login first!');
          this.router.navigate(['login']);
        }
      },
      (err) => {
        console.log('Error response:', err);
      }
    );
  }

  removeFromFavorites(adid, i) {
    let data = {
      uid: this.sessionUser,
      aid: adid,
    };

    this._apiService.removeFromFavorites(data).subscribe(
      (res: any) => {
        if (res == 'success') {
          this.successToast('Removed from your Favorites.');
          this.adDetails[i].heartVisible = true;
          this.adDetails[i].heartRedVisible = false;
        } else {
          this.errorToast('Error removing from Favorites!');
        }
      },
      (err) => {
        console.log('Error response:', err);
      }
    );
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

  async share(adId) {
    const shareRet = await Share.share({
      title: 'Check out this cool app!',
      text: 'If you like this post please share.',
      url: `https://fabapp-47874.web.app/fabApp/product-details/${adId}`,
      dialogTitle: 'Share with friends', // optional
    });
    console.log('Share result:', shareRet);
  }

  fetchAdminData() {
    this.storage.get('admin').then((val) => {
      let data = {
        uid: val.userid,
      };

      this._apiService.fetchAdminData(data).subscribe((res: any) => {
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
      });
    });
  }

  dataOnPageLoad() {
    
    window.addEventListener('resize', this.onResize.bind(this));
    this.fetchAdminData();

    this.storage.get('admin').then(
      (val) => {
        if (val != null) {
          console.log('data fetched');
          this.sessionUser = val.userid;

          this.newData(val.userid);

          let favData = {
            uid: val.userid,
          };

          this._apiService.fetchLoggedAds(favData).subscribe((res: any) => {
            // console.log('Logged Ads response:', res);
          });

          this._apiService.fetchFavorites(favData).subscribe((res: any) => {
            // console.log('favorites response:', res);

            this.favData = res;
          });
        } else {
          console.log('not fetched');
          this.newData(null);
        }
      },
      (er) => {
        console.log(er);
      }
    );

    // let slug = this.route.snapshot.paramMap.get('id');
    // console.log("Get Slug:", slug);

    // let slugData = {
    //   uid: slug
    // }
  }

  newData(userId) {
    let data = {
      uid: userId,
    };
    this.http
      .post('https://specbits.com/class2/fab/adds', data)
      .subscribe((res: any) => {
        console.log('new user details:', res);

        // Displaying ads from database
        let dataLength = res.length;
        for (let i = 0; i < dataLength; i++) {
          let adTitle = '';
          let adDetail = '';
          let itemInfo: any = [];
          let itemLabel: any = [];
          let imagesArray: any = [];
          let ad_id;
          let adAdmin;
          let adMobile;
          let timestamp;
          let adStatus;
          let heartVisible;
          let heartRedVisible;
          for (let key in res[i]) {
            if (key === 'addHeadings') {
              adTitle = res[i][key].add_title;
              adDetail = res[i][key].add_detail;
              adAdmin = res[i][key].user_id;
              adStatus = res[i][key].add_status;
            }

            if (key === 'addPersonalInfo') {
              adMobile = res[i][key].phonecode + res[i][key].mobile;
              timestamp = res[i][key].created_at;
            }

            if (key === 'addData') {
              for (let j = 0; j < res[i][key].length; j++) {
                for (let val in res[i][key][j]) {
                  if (val == 'main_data') itemInfo.push(res[i][key][j][val]);
                  if (val == 'label') itemLabel.push(res[i][key][j][val]);
                  if (val == 'add_id') ad_id = res[i][key][j][val];
                }
                // }
              }
            }

            if (key === 'addImage') {
              for (let j = 0; j < res[i][key].length; j++) {
                for (let val in res[i][key][j]) {
                  if (val == 'image_name')
                    imagesArray.push(res[i][key][j][val]);
                }
                // }
              }
            }

            if (key === 'fav') {
              heartVisible = res[i][key].heartVisible;
              heartRedVisible = res[i][key].heartRedVisible;
            }
          }

          let itemObj = {};

          for (let k = 0; k < itemInfo.length; k++) {
            itemObj[itemLabel[k]] = itemInfo[k];
          }

          let data = {
            adAdmin: adAdmin,
            adStatus: adStatus,
            adTitle: adTitle,
            itemObj: itemObj,
            adDetail: adDetail,
            imagesArray: imagesArray,
            ad_id: ad_id,
            adMobile: adMobile,
            timestamp: this.timestamp(timestamp),
            heartVisible: heartVisible,
            heartRedVisible: heartRedVisible,
          };

          if (
            userId != data.adAdmin &&
            data.adStatus == 'approved' &&
            userId != null
          ) {
            this.adDetails.push(data);
            if (this.adDetails.length != 0) {
              this.showCommercialTitle = true;
              this.showStickyTitle = true;
            }
          }

          if (userId == null) {
            this.adDetails.push(data);
            if (this.adDetails.length != 0) {
              this.showCommercialTitle = true;
              this.showStickyTitle = true;
            }
          }
        }

        console.log('Total ad Data:', this.adDetails);
      });
  }

  // @ViewChild('swiper') swiper: SwiperComponent;

  ionViewDidEnter() {
    this.storage.get('changeLang').then((val) => {
      if (val) {
        if (val.lang === 'en') {
          this.english = true;
          this.arabic = false;
        } else if (val.lang === 'ar') {
          this.arabic = true;
          this.english = false;
        }
      }
    }).catch((err) => {
      console.log(err);
    });
    
  }

  ngOnInit() {
    this.dataOnPageLoad();
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

  onResize() {
    if (window.innerWidth >= 992) {
      this.homeTabComponent = true;
    } else {
      if (this.commerceTab) this.homeTabComponent = false;
      else this.homeTabComponent = !this.homeTabComponent;
    }
  }
}
