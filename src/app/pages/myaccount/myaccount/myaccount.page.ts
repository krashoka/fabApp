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

  segmentChanged(event) {
    this.selectedSegment = event.detail.value;
    // console.log('SelectedSegment:', this.selectedSegment);
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

    this.storage.get('admin').then((val) => {
      // console.log(val);
      let mobile = '+' + val.phonecode + ' ' + val.usermob;
      this.mobNumber = mobile;

      this.username = val.username;
    });
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  goBack() {
    this.navCtrl.back();
  }

  goToMyPoints() {
    this.router.navigate(['my-points']);
  }

  goToProductDetails(ad) {
    this.router.navigateByUrl(`product-details/${ad.ad_id}`);
  }

  async share() {
    const shareRet = await Share.share({
      title: 'Check out this cool app!',
      text: 'Join with my Referral Code "ABcDe" to get exciting offer.',
      url: 'https://fabapp-47874.web.app/fabApp/signup',
      dialogTitle: 'Share with friends', // optional
    });
    console.log('Share result:', shareRet);
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

  myAccountDataOnPageLoad() {
    this.selectedSegment = this.route.snapshot.paramMap.get('slug');
    // console.log('Segment VAl:', this.selectedSegment);
    // if (this.selectedSegment == null) this.selectedSegment = 'ads';

    // *********** Showing Only user ads *************
    this.storage.get('admin').then((val) => {
      this.sessionUser = val.userid;
      // });

      this.http
        .get('https://specbits.com/class2/fab/adds')
        .subscribe((res: any) => {
          console.log('Show Ad details:', res);

          this.adDetails = [];
          this.chatsOnAd = [];

          if (res) {
            this.myAds = true;
            this.emptyMyAds = false;
          }

          let count = 0;
          // let chatCount = 0;
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
            };

            if (this.sessionUser == data.adAdmin) {
              this.adDetails.push(data);
              count++;

              let value = { aid: data.ad_id, uid: this.sessionUser };
              this.http
                .post('https://specbits.com/class2/fab/fetch-comment', value)
                .subscribe((com: any) => {
                  console.log('comment data for chat:', com);

                  if (com != null) {
                    // this.myChatsCount++;
                    this.emptyChats = false;
                    this.chats = true;
                    this.chatsOnAd.push(data);
                  }
                });
            }
          }

          this.myAdsCount = count;

          console.log('Total ad Data:', this.adDetails);
        });

      //************ SHOWING FAVORITES ADS **************/
      // this.storage.get('admin').then((val) => {
      let favData = {
        uid: val.userid,
      };

      this._apiService.fetchFavorites(favData).subscribe(
        (res: any) => {
          console.log('Show fav:', res);

          this.favorites = [];

          if (res) {
            this.emptyFavAds = false;
            this.favAds = true;
            this.favAdsCount = res.length;

            for (let i = 0; i < res.length; i++) {
              let result = this.timestamp(res[i].timestamp);

              let favData = {
                title: res[i].title,
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
