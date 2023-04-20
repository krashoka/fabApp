import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage {
  adTitle: any;
  adDetail: any;
  adAdmin: any;
  adId: any;
  price: any;
  prodDetails: any;
  adImage: any;
  timestamp: any;
  commentDisabled = true;
  commentValue: any;
  sessionVal = false;
  userid: any;
  comments: any = [];
  adMobile: any;
  adminSessionId: any;
  adData: any = [];

  chatUserList: any = {};

  sessionUser: any;

  chatCardDisplay: any;
  commentCardDisplay: any;

  heart = true;
  heartRed = false;
  checkFav = 'Add to ';
  flag = false;

  waLink = 'https://wa.me/';

  canComment = true;
  allComments = false;

  readMore = true;
  readLess = false;
  adDetailsHeight = '40px';
  bShadow = 'inset 0 -10px 10px -10px rgba(0, 0, 0, 0.4)';
  oFlow = 'hidden';

  // Progress bar variables
  counter = 0;
  timeOnPage = 0;
  progressBarWidth = '0%';
  // ///////////////////

  // Offer making variables
  makeOffer: any;
  // ///////////////////////

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private toastCtrl: ToastController,
    private http: HttpClient,
    private route: ActivatedRoute,
    private _apiService: ApiService
  ) {
    this.storage.create();
  }

  goToCommercialAds() {
    this.router.navigate(['commercialads']);
  }

  goToStickyAds() {
    this.router.navigate(['products']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goBack() {
    this.navCtrl.back();
  }

  goToAddNewAd() {
    this.router.navigate(['add-new-advertisement']);
  }

  async share() {
    const shareRet = await Share.share({
      title: 'Check out this cool app!',
      text: 'If you like this post please share.',
      url: `https://fabapp-47874.web.app/fabApp/product-details/${this.adId}`,
      dialogTitle: 'Share with friends', // optional
    });
    console.log('Share result:', shareRet);
  }

  readDetailsMore() {
    this.readMore = !this.readMore;
    this.readLess = !this.readLess;
    this.adDetailsHeight = 'auto';
    this.bShadow = 'none';
    this.oFlow = 'none';
  }

  readDetailsLess() {
    this.readMore = !this.readMore;
    this.readLess = !this.readLess;
    this.adDetailsHeight = '40px';
    this.bShadow = 'inset 0 -10px 10px -10px rgba(0, 0, 0, 0.5)';
    this.oFlow = 'hidden';
  }

  favoritesToggle() {
    if (this.flag) {
      this.removeFromFavorites();
      this.flag = false;
    } else {
      this.addToFavorites();
      this.flag = true;
    }
  }

  goToProductDetails(ad) {
    this.router.navigateByUrl(`product-details/${ad.ad_id}`);
  }

  addToFavorites() {
    let data = {
      uid: this.sessionUser,
      aid: this.adId,
    };

    this._apiService.addToFavorites(data).subscribe(
      (res: any) => {
        if (res == 'success') {
          this.successToast('Added to your Favorites.');
          this.heart = false;
          this.heartRed = true;
          this.checkFav = 'Remove from ';
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

  removeFromFavorites() {
    let data = {
      uid: this.sessionUser,
      aid: this.adId,
    };

    this._apiService.removeFromFavorites(data).subscribe(
      (res: any) => {
        if (res == 'success') {
          this.successToast('Removed from your Favorites.');
          this.heart = true;
          this.heartRed = false;
          this.checkFav = 'Add to ';
        } else {
          this.errorToast('Error removing from Favorites!');
        }
      },
      (err) => {
        console.log('Error response:', err);
      }
    );
  }

  addToFav(adid, i) {
    let data = {
      uid: this.sessionUser,
      aid: adid,
    };

    this._apiService.addToFavorites(data).subscribe(
      (res: any) => {
        if (res == 'success') {
          this.successToast('Added to your Favorites.');
          this.adData[i].heartVisible = false;
          this.adData[i].heartRedVisible = true;
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

  removeFromFav(adid, i) {
    let data = {
      uid: this.sessionUser,
      aid: adid,
    };

    this._apiService.removeFromFavorites(data).subscribe(
      (res: any) => {
        if (res == 'success') {
          this.successToast('Removed from your Favorites.');
          this.adData[i].heartVisible = true;
          this.adData[i].heartRedVisible = false;
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

  // option = {
  //   slidesPerView: 1,
  //   centeredSlides: true,
  //   loop: true,
  //   spaceBetween: 2,
  // };

  // option2 = {
  //   slidesPerView: 4,
  //   // centeredSlides: true,
  //   loop: true,
  //   spaceBetween: 40,
  //   // autoplay:true,
  // };

  increaseCounter() {
    this.counter++;
    this.progressBarWidth = this.counter + '%'; // increase the width of the progress bar by 10% with each iteration
    if (this.counter < 100) {
      setTimeout(() => {
        this.timeOnPage += 600;
        this.increaseCounter();
      }, 600);
    }
  }

  // ************* Share Function ******************
  async shareRelatedPost(adId) {
    const shareRet = await Share.share({
      title: 'Check out this cool app!',
      text: 'If you like this post please share.',
      url: `https://fabapp-47874.web.app/fabApp/product-details/${adId}`,
      dialogTitle: 'Share with friends', // optional
    });
    console.log('Share result:', shareRet);
  }

  async ionViewWillEnter() {
    // TESTING CODE FOR PROGRESS BAR
    // setTimeout(() => {
    // this.timeOnPage += 5000;
    this.increaseCounter();
    // }, 5000);
    // ///////////////////////////

    const slug = this.route.snapshot.paramMap.get('id');
    this.adId = slug;

    this.storage.get('admin').then(
      (val) => {
        this.sessionUser = val.userid;
      },
      (err) => {
        console.log(err);
      }
    );

    // await this.storage.get('adId').then((val) => {
    //   console.log('aDiD:', val);
    //   this.adAdmin = val.adINFO.adAdmin;
    //   this.adId = val.adINFO.ad_id;
    //   this.adTitle = val.adINFO.adTitle;
    //   this.price = val.adINFO.itemObj.Price;
    //   this.prodDetails = val.adINFO.itemObj;
    //   this.adDetail = val.adINFO.adDetail;
    //   this.adImage = val.adINFO.imagesArray[0];
    //   this.adMobile = val.adINFO.adMobile;
    // });
    // ***********************************************************

    let currAdItemInfo: any = [];
    let currAdItemLabel: any = [];
    // let ad_id;
    let currAdItemObj = {};

    this.http.get('https://specbits.com/class2/fab/adds').subscribe(
      (res: any) => {
        console.log('Show Ad details:', res);

        this.adData = [];
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
              if (res[i][key].add_id == slug) {
                this.adTitle = res[i][key].add_title;
                this.adDetail = res[i][key].add_detail;
                this.adAdmin = res[i][key].user_id;
              } else {
                adTitle = res[i][key].add_title;
                adDetail = res[i][key].add_detail;
                adAdmin = res[i][key].user_id;
              }
            }

            if (key === 'addPersonalInfo') {
              if (res[i][key].add_id == slug) {
                this.adMobile = res[i][key].phonecode + res[i][key].mobile;
                this.timestamp = this.timestampFun(res[i][key].created_at);
              } else {
                adMobile = res[i][key].phonecode + res[i][key].mobile;
                timestamp = res[i][key].created_at;
              }
            }

            if (key === 'addData') {
              for (let j = 0; j < res[i][key].length; j++) {
                for (let val in res[i][key][j]) {
                  if (res[i][key][j].add_id == slug) {
                    if (val == 'main_data')
                      currAdItemInfo.push(res[i][key][j][val]);
                    if (val == 'label')
                      currAdItemLabel.push(res[i][key][j][val]);
                    // if (val == 'add_id') ad_id = res[i][key][j][val];
                  } else {
                    if (val == 'main_data') itemInfo.push(res[i][key][j][val]);
                    if (val == 'label') itemLabel.push(res[i][key][j][val]);
                    if (val == 'add_id') ad_id = res[i][key][j][val];
                  }
                }
                // }
              }
            }

            if (key === 'addImage') {
              for (let j = 0; j < res[i][key].length; j++) {
                for (let val in res[i][key][j]) {
                  if (res[i][key][0].add_id == slug) {
                    this.adImage = res[i][key][0].image_name;
                  } else {
                    if (val == 'image_name')
                      imagesArray.push(res[i][key][j][val]);
                  }
                }
              }
            }
          }

          for (let k = 0; k < currAdItemInfo.length; k++) {
            if (currAdItemLabel[k] == 'Price') this.price = currAdItemInfo[k];
            currAdItemObj[currAdItemLabel[k]] = currAdItemInfo[k];
          }

          let itemObj = {};

          for (let k = 0; k < itemInfo.length; k++) {
            itemObj[itemLabel[k]] = itemInfo[k];
          }

          if (adAdmin != null) {
            let data = {
              adAdmin: adAdmin,
              adTitle: adTitle,
              itemObj: itemObj,
              adDetail: adDetail,
              imagesArray: imagesArray,
              ad_id: ad_id,
              adMobile: adMobile,
              timestamp: this.timestampFun(timestamp),
              heartVisible: true,
              heartRedVisible: false,
            };

            if (this.sessionUser != data.adAdmin) {
              this.adData.push(data);
            }
          }
        }

        console.log('adDataas:', this.adData);
      },
      (err) => {
        console.log(err);
      }
    );

    this.prodDetails = currAdItemObj;
    // ///////////////////////////////////////////////////////////////////////

    this.storage.get('admin').then(
      (session) => {
        // ////////////////////
        let value = { aid: slug, uid: session.userid };
        this.http
          .post('https://specbits.com/class2/fab/fetch-comment', value)
          .subscribe(
            (com: any) => {
              console.log('chaaaaat:', com);

              // ///////////////////////////
              console.log('admin session:', session);
              if (session != null) {
                console.log('User is in session');
                this.adminSessionId = session.userid;
                if (com.length != 0) {
                  this.canComment = false;
                  this.allComments = true;

                  if (session.userid == this.adAdmin) {
                    this.chatCardDisplay = true;
                    this.commentCardDisplay = false;
                    this.makeOffer = false;

                    // Filtering number of users commented on a particular ad.
                    for (let i = 0; i < com.length; i++) {
                      let sameUser = com[i].user_id;
                      console.log('sameUser:', sameUser);
                      // let chats = {};
                      // chats[sameUser]
                      // chats['time'] = com[i].created_at;
                      this.chatUserList[sameUser] = com[i].username;
                    }

                    console.log('chatUserList:', this.chatUserList);
                  } else {
                    this.chatCardDisplay = false;
                    this.commentCardDisplay = true;
                    this.comments = com;
                    this.makeOffer = true;
                    console.log('All comments:', this.comments);
                  }
                } else {
                  if (session.userid == this.adAdmin) {
                    this.canComment = false;
                    this.allComments = false;
                  } else {
                    this.commentDisabled = false;
                    this.canComment = true;
                    this.allComments = false;
                  }
                }

                this.sessionVal = true;
                this.userid = session.userid;
              } else {
                this.commentDisabled = true;
                this.canComment = true;
                this.allComments = false;
              }
            },
            (err) => {
              console.log(err);
            }
          );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Function to show chat on click of particular user
  showUserChat(key) {
    let data = {
      aid: this.adId,
      uid: key,
    };

    this._apiService.showUserChat(data).subscribe(
      (res: any) => {
        console.log('Fetched chats:', res);
        this.comments = [];
        for (let i = 0; i < res.length; i++) {
          let obj = {};
          if (res[i].commenter == 'user') {
            obj['commenter'] = 'owner';
            obj['username'] = res[i].username;
            obj['comment'] = res[i].comment;
            this.comments.push(obj);
          } else {
            {
              obj['commenter'] = 'user';
              obj['username'] = res[i].username;
              obj['comment'] = res[i].comment;
              this.comments.push(obj);
            }
          }
        }
        console.log('New Comments:', this.comments);
        this.chatCardDisplay = false;
        this.commentCardDisplay = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  @ViewChild('content', { static: false }) content: any = ElementRef;

  addComment() {
    if (this.sessionVal) {
      let commentData = {
        aid: this.adId,
        uid: this.userid,
        comment: this.commentValue,
      };
      this.http
        .post('https://specbits.com/class2/fab/make-comment', commentData)
        .subscribe(
          (res: any) => {
            console.log('comment response:', res);
            this.commentValue = '';

            let value = { aid: this.adId, uid: this.userid };
            this.http
              .post('https://specbits.com/class2/fab/fetch-comment', value)
              .subscribe(
                (res: any) => {
                  this.comments = res;

                  setTimeout(() => {
                    this.content.nativeElement.scrollTo({
                      top: this.content.nativeElement.scrollHeight,
                      behavior: 'smooth',
                    });
                  }, 100);
                },
                (err) => {
                  console.log(err);
                }
              );
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.router.navigate(['login']);
    }
  }

  show = true;
  hide = false;
  commentDisplay = false;

  showComment() {
    this.show = !this.show;
    this.hide = !this.hide;
    this.commentDisplay = !this.commentDisplay;

    let value = { aid: this.adId, uid: this.userid };
    this.http
      .post('https://specbits.com/class2/fab/fetch-comment', value)
      .subscribe(
        (res: any) => {
          this.comments = res;
          setTimeout(() => {
            this.content.nativeElement.scrollTo({
              top: this.content.nativeElement.scrollHeight,
              behavior: 'smooth',
            });
          }, 100);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  timestampFun(time) {
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
