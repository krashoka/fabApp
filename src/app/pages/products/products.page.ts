import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Share } from '@capacitor/share';

import { SharedService } from 'src/app/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  public buttonClickSubscription: Subscription;

  adDetails: any = [];

  categoryTitle: any;

  categories: any = [];

  newUrl: any = [];

  waLink = 'https://wa.me/';

  totalAds: any;

  sessionUser: any;

  english = true;
  arabic = false;

  // breadcrumbs: any = [];

  // isArrow = true;

  // imageUrl: any;

  breadcrumbs: { title: string; link: string }[];

  currentUrl: string = 'http://localhost:8100/fabApp/';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    public http: HttpClient,
    private storage: Storage,
    public _apiService: ApiService,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    public breadcrumbService: BreadcrumbService,
    private sharedService: SharedService
  ) {
    this.storage.create();

    // this.currentUrl = this.router.url;

    this.breadcrumbs = this.breadcrumbService.getBreadcrumbs();

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

  // breadcrumbsFun(titles) {
  //   const slug = this.route.snapshot.paramMap.get('slug');
  //   let breadcrumbs: Breadcrumb[] = [];
  //   if (slug == '0') {
  //     breadcrumbs.push({ title: 'Home', link: `${this.currentUrl}` });
  //   } else {
  //     breadcrumbs.push({ title: 'Home', link: `${this.currentUrl}` });
  //     breadcrumbs.push({
  //       title: `${titles}`,
  //       link: `${this.currentUrl}/products/${slug}`,
  //     });
  //   }

  //   this.breadcrumbService.setBreadcrumbs(breadcrumbs);
  // }

  goBack() {
    this.breadcrumbService.clearBreadcrumbs();
    this.navCtrl.back();
  }

  goToProductDetails(ad) {
    let value = { aid: ad.ad_id, uid: this.sessionUser };
    this.http
      .post('https://specbits.com/class2/fab/fetch-comment', value)
      .subscribe((res: any) => {
        let data = {
          adINFO: ad,
          comment: res,
        };
        this.storage.set('adId', data);
        this.router.navigateByUrl(`product-details/${ad.ad_id}-${ad.adAdmin}`);
      });
  }

  goToSticky(datas: any, titles: any, parent: any, slug: any) {
    // this.breadcrumbsFun(titles);

    // const title = this.route.snapshot.data['titles'];
    const link = `${this.currentUrl}/products/${datas}-${slug}`;

    // Add the breadcrumb to the breadcrumb trail
    this.breadcrumbService.addBreadcrumb(titles, link);

    let data = { cid: datas };

    console.log('newTitttltltlt:', titles);
    if (parent == '0') {
      this.storage.set('catTitle', slug);
      this.router.navigateByUrl(`products/${datas}-${slug}`);
    } else {
      this._apiService.sendCategory(data).subscribe((res: any) => {
        console.log('check empty: ', res);
        if (res == 'empty') {
          console.log('give res', res);
          this.router.navigateByUrl(`products/${datas}-${slug}`);
        } else {
          // this.breadcrumbs.push(titles);
          this.router.navigateByUrl(`products/${datas}-${slug}`);
        }
      });
    }
  }

  addToFavorites(adid, i) {
    let data = {
      uid: this.sessionUser,
      aid: adid,
    };

    this._apiService.addToFavorites(data).subscribe(
      (res: any) => {
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

  fetchAdsData(userIDs, id) {
    let cidData = {
      cid: id,
    };
    console.log('fetch IDDD:', cidData);
    this._apiService.fetchAds(cidData).subscribe((res: any) => {
      console.log('Show Ad details:', res);
      // Displaying ads from database
      let dataLength = res.length;

      let count = 0;

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
        let heartVisible;
        let heartRedVisible;

        for (let key in res[i]) {
          if (key === 'addHeadings') {
            adTitle = res[i][key].add_title;
            adDetail = res[i][key].add_detail;
            adAdmin = res[i][key].user_id;
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
            }
          }

          if (key === 'addImage') {
            for (let j = 0; j < res[i][key].length; j++) {
              for (let val in res[i][key][j]) {
                if (val == 'image_name') imagesArray.push(res[i][key][j][val]);
              }
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

        if (userIDs != data.adAdmin) {
          this.adDetails.push(data);
          count++;
        }

        this.totalAds = count;
      }
    });
  }

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
    // window.addEventListener('resize', this.onResize.bind(this));

    // this.breadcrumbService;
    // let ct = 0;
    // setTimeout(() => {
    //   let cnt = setInterval(() => {
    //     this.ionViewDidEnter();
    //     ct++;
    //     if (ct == 10) clearInterval(cnt);
    //   }, 100);
    // }, 100);

    const slug = this.route.snapshot.paramMap.get('slug');

    console.log('SlugValue:', slug);
    let titles;
    let id;

    if (slug) {
      titles = slug.replace(/[^a-zA-Z]/g, '');
      id = slug.replace(/\D/g, '');
      console.log('ID Value:', id);
    }

    let cidData = {
      cid: id,
    };

    this.storage.get('admin').then((val) => {
      if (val != null) {
        this.sessionUser = val.userid;
        this.fetchAdsData(val.userid, id);
      } else {
        this.fetchAdsData(null, id);
      }
    });

    if (id == '0') {
      this.http.get('https://specbits.com/class2/fab/index').subscribe(
        (res: any) => {
          this.categories = res;

          console.log('product from home:', res);
        },
        (error: any) => {
          console.log('ErrorMessage: ', error);
        }
      );

      // const link = `${this.currentUrl}/products/${slug}`;
      // this.breadcrumbService.addBreadcrumb(titles, link);

      this.storage.get('catTitle').then((val) => {
        console.log('data in Cat Title:', val);
        this.categoryTitle = val;
      });
    } else {
      this._apiService.sendCategory(cidData).subscribe(
        (res: any) => {
          if (res != 'empty') this.categories = res;
          console.log("What's response:", res);
        },
        (err) => {
          console.log(err);
        }
      );

      // const link = `${this.currentUrl}/products/${slug}`;
      // this.breadcrumbService.addBreadcrumb(titles, link);

      this.storage.get('catTitle').then((val) => {
        this.categoryTitle = val;
      });
    }
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

  // onResize() {
  //   if (window.innerWidth >= 992) {
  //     this.isArrow = false;
  //   }else{
  //     this.isArrow = true;
  //   }
  // }
}
