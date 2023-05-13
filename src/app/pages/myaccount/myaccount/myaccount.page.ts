import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { Share } from '@capacitor/share';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage {
  mobNumber: any;
  username: any;
  referralCode: any;

  selectedSegment: any;

  sessionUser: any;
  adDetails: any = [];
  chatsOnAd: any = [];

  favorites: any = [];

  emptyFavAds = true;
  favAds = false;
  favAdsCount = 0;

  emptyChats = true;
  chats = false;

  emptyMyAds = true;
  myAds = false;
  myAdsCount = 0;
  myChatsCount = 0;

  emptyReferrals = true;
  referrals = false;
  myReferrals: any = [];
  refCount = 0;

  emptySellings = true;
  sellings = false;
  sellingsData: any = [];
  sellCount = 0;

  emptyPurchases = true;
  purchases = false;
  purchasesData: any = [];
  purchaseCount = 0;

  myPoints = 0;

  analyticsSidebar = false;
  adName: any;

  segmentChanged(event) {
    this.selectedSegment = event.detail.value;
    this.router.navigateByUrl(`/myaccount/${this.selectedSegment}`);
  }

  constructor(
    private router: Router,
    private navCtrl: NavController,
    public http: HttpClient,
    private storage: Storage,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private _apiService: ApiService
  ) {
    this.storage.create();
  }

  // My Notification SideMenu
  openAnalytics(title) {
    this.analyticsSidebar = !this.analyticsSidebar;
    this.adName = title;
  }

  dismissAnalytics() {
    this.analyticsSidebar = !this.analyticsSidebar;
  }

  goToProfile() {
    this.fetchAdminData();
    this.router.navigate(['profile']);
  }

  goBack() {
    this.navCtrl.back();
  }

  goToMyPoints() {
    this.fetchAdminData();
    this.router.navigate(['my-points']);
  }

  goToProductDetails(ad) {
    this.router.navigateByUrl(`product-details/${ad.ad_id}-${ad.adAdmin}`);
  }

  async share() {
    const shareRet = await Share.share({
      title: 'Check out this cool app!',
      text: 'Join with my Referral Code "ABcDe" to get exciting offer.',
      url: 'https://fabapp-47874.web.app/fabApp/signup',
      dialogTitle: 'Share with friends', // optional
    });
  }

  removeFromFavorites(adid) {
    let data = {
      uid: this.sessionUser,
      aid: adid,
    };

    this._apiService.removeFromFavorites(data).subscribe(
      (res: any) => {
        if (res == 'success') {
          this.successToast('Removed from your Favorites.');
          this.myAccountDataOnPageLoad();
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

  fetchAdminData() {
    this.storage.get('admin').then(
      (val) => {
        if (val != null) {
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
  }

  myAccountDataOnPageLoad() {
    this.fetchAdminData();

    this.selectedSegment = this.route.snapshot.paramMap.get('slug');

    // *********** Showing Only user ads *************
    this.storage.get('admin').then((val) => {
      this.sessionUser = val.userid;

      let mobile = '+' + val.phonecode + ' ' + val.usermob;
      this.mobNumber = mobile;

      this.username = val.username;
      this.referralCode = val.referral;
      this.myPoints = val.myPoints;

      this.http
        .get('https://specbits.com/class2/fab/adds')
        .subscribe((res: any) => {

          console.log("received daTa:", res);

          this.adDetails = [];
          this.chatsOnAd = [];

          if (res.length > 0) {
            this.myAds = true;
            this.emptyMyAds = false;
          }

          let count = 0;
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
                }
              }

              if (key === 'addImage') {
                for (let j = 0; j < res[i][key].length; j++) {
                  for (let val in res[i][key][j]) {
                    if (val == 'image_name')
                      imagesArray.push(res[i][key][j][val]);
                  }
                }
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
            };

            if (this.sessionUser == data.adAdmin) {
              this.adDetails.push(data);
              count++;

              let value = { aid: data.ad_id, uid: this.sessionUser };
              this.http
                .post('https://specbits.com/class2/fab/fetch-comment', value)
                .subscribe((com: any) => {

                  if (com != null) {
                    this.myChatsCount = com.length;
                    this.emptyChats = false;
                    this.chats = true;
                    this.chatsOnAd.push(data);
                  }
                });
            }
          }

          console.log("adDetailssss:", this.adDetails);
          

          this.myAdsCount = count;
        });

      //************ SHOWING FAVORITES ADS **************/
      // this.storage.get('admin').then((val) => {
      let favData = {
        uid: val.userid,
      };

      this._apiService.fetchFavorites(favData).subscribe(
        (res: any) => {

          this.favorites = [];

          if (res.length > 0) {
            this.emptyFavAds = false;
            this.favAds = true;
            this.favAdsCount = res.length;

            for (let i = 0; i < res.length; i++) {
              let result = this.timestamp(res[i].timestamp);

              let favData = {
                title: res[i].title,
                adAdmin: res[i].creatorID,
                price: res[i].price,
                timestamp: result,
                images: res[i].images,
                ad_id: res[i].id,
              };

              this.favorites.push(favData);
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );

      //************ SHOWING REFERRALS **************/
      this._apiService.fetchReferrals(favData).subscribe(
        (res: any) => {

          this.myReferrals = [];

          if (res.length > 0) {
            this.referrals = true;
            this.emptyReferrals = false;
            this.refCount = res.length;
            for (let i = 0; i < res.length; i++) {
              let reffD = {
                username: res[i].user_name,
                joinedOn: this.timestamp(res[i].created_at),
                mobile: res[i].phonecode + res[i].user_mob,
              };

              this.myReferrals.push(reffD);
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );

      //************ SHOWING SELLINGS **************/
      this._apiService.fetchSellings(favData).subscribe(
        (res: any) => {

          this.sellingsData = [];

          if (res.length > 0) {
            this.sellCount = res.length;
            this.sellings = true;
            this.emptySellings = false;

            for (let i = 0; i < res.length; i++) {
              let result = this.timestamp(res[i].timestamp);

              let sellData = {
                title: res[i].addname,
                buyerName: res[i].buyerName,
                price: res[i].price,
                timestamp: result,
                image: res[i].image,
              };

              this.sellingsData.push(sellData);
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );

      //************ SHOWING PURCHASES **************/
      this._apiService.fetchPurchases(favData).subscribe(
        (res: any) => {
          
          this.purchasesData = [];

          if (res.length > 0) {
            this.purchaseCount = res.length;
            this.purchases = true;
            this.emptyPurchases = false;

            for (let i = 0; i < res.length; i++) {
              let result = this.timestamp(res[i].timestamp);

              let purchaseData = {
                title: res[i].addname,
                sellerName: res[i].sellerName,
                price: res[i].price,
                timestamp: result,
                image: res[i].image,
              };

              this.purchasesData.push(purchaseData);
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  async ionViewWillEnter() {
    await this.myAccountDataOnPageLoad();
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
