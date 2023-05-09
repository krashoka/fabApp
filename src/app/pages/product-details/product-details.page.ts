import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Share } from '@capacitor/share';
import { GoSell } from "@tap-payments/gosell";

// GoSell.init({
//   publishableKey: 'YOUR_PUBLISHABLE_KEY',
//   productionMode: false,
//   language: 'en',
//   merchantID: 'YOUR_MERCHANT_ID'
// });

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})

export class ProductDetailsPage {
  adTitle: any;
  adDetail: any;
  adKaAdmin: any;
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

  commentedUserId: any;

  chatUserList: any = {};

  sessionUser: any;

  showBack = false;

  chatCardDisplay: any;
  commentCardDisplay: any;

  heart = true;
  heartRed = false;
  checkFav: any;
  flag: any;

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
  showTimer = true;
  // ///////////////////

  // Offer making variables
  makeOffer: any;
  makeOfferSection = true;
  inputOffer = true;
  buyNow = false;
  offerPrice = false;
  priceOffered: any;
  offerBtn = false;
  offeredPriceArray: any = [];
  offeredUserIdStatus = {};
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

  buyAdNow() {
    let data = {
      uid: this.sessionUser,
      aid: this.adId,
    };

    this._apiService.buyAdNow(data).subscribe((res: any) => {
      if(res){
        console.log("Buy Now Response: ", res);
        // this.successToast("Transaction successful");
        window.location.href = res;
      }
    }, err => {
      this.errorToast(err.error.message);
    });
  }

  // async buyAdNow() {
  //   try {
  //     const charge = await GoSell.charge.create({
  //       amount: 100,
  //       currency: 'AED',
  //       customer: {
  //         first_name: 'John',
  //         last_name: 'Doe',
  //         email: 'john.doe@example.com',
  //         phone: {
  //           country_code: 'AE',
  //           number: '0555555555'
  //         }
  //       },
  //       source: {
  //         id: 'tok_XXXXXXXXXXXXXX'
  //       },
  //       description: 'Test Payment'
  //     });
  //     console.log(charge);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
          this.checkFav = 'Remove from favorites ';
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
          this.checkFav = 'Add to favorites';
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

  prodData(userId, slug) {
    let data = {
      uid: userId,
    };

    let currAdItemInfo: any = [];
    let currAdItemLabel: any = [];
    let currAdItemObj = {};

    this.http.post('https://specbits.com/class2/fab/adds', data).subscribe(
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
          let heartVisible;
          let heartRedVisible;

          for (let key in res[i]) {
            if (key === 'addHeadings') {
              if (res[i][key].add_id == slug) {
                this.adTitle = res[i][key].add_title;
                this.adDetail = res[i][key].add_detail;
                this.adKaAdmin = res[i][key].user_id;
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

            if (key === 'fav') {
              if (res[i][key].add_id == slug) {
                heartVisible = res[i][key].heartVisible;
                if (heartVisible) {
                  this.checkFav = 'Add to favorites';
                  this.heart = true;
                  this.heartRed = false;
                  this.flag = false;
                }

                heartRedVisible = res[i][key].heartRedVisible;
                if (heartRedVisible) {
                  this.checkFav = 'Remove from favorites';
                  this.heart = false;
                  this.heartRed = true;
                  this.flag = true;
                }
              } else {
                heartVisible = res[i][key].heartVisible;
                heartRedVisible = res[i][key].heartRedVisible;
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
              heartVisible: heartVisible,
              heartRedVisible: heartRedVisible,
            };

            if (this.sessionUser != data.adAdmin) {
              this.adData.push(data);
            }
          }
        }

        console.log('adDataas:', this.adData);
        console.log('adImage:', this.adImage);
      },
      (err) => {
        console.log(err);
      }
    );

    this.prodDetails = currAdItemObj;
  }

  increaseCounter(timer, slug) {
    this.counter++;
    this.progressBarWidth = this.counter + '%'; // increase the width of the progress bar by 10% with each iteration
    if (this.counter < 100) {
      setTimeout(() => {
        this.increaseCounter(timer, slug);
      }, timer * 10);
    } else {
      this.storage.get('admin').then(
        (val) => {
          if (val != null) {
            let data = {
              vid: val.userid,
              aid: slug,
            };
            this._apiService.adViewPoint(data).subscribe((res: any) => {});
            // this.showTimer = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  sendOffer() {
    this.storage.get('admin').then(
      (val) => {
        if (val != null) {
          if (this.priceOffered > 0) {
            let data = {
              aid: this.adId,
              vid: this.sessionUser,
              op: this.priceOffered,
            };

            this.priceOffered = '';

            this._apiService.sendOffer(data).subscribe(
              (res: any) => {
                console.log('sendOffer response:', res);
                if (res) {
                  this.successToast('Request sent successfully');
                  // this.inputOffer = false;
                }
              },
              (err) => {
                console.log(err);
                this.errorToast(err.error.message);
              }
            );
          } else {
            this.errorToast('Enter valid amount!');
          }
        } else {
          this.router.navigate(['login']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  acceptOrRejectOffer(visitorId, status) {
    let data = {
      aid: this.adId,
      uid: this.sessionUser,
      vid: visitorId,
      res: status,
    };

    this._apiService.offerResponse(data).subscribe(
      (res: any) => {
        console.log('offerREsponsse Value:', res);
        if (res) {
          this.offeredPriceArray = [];
          this.ionViewWillEnter();
        }
      },
      (err) => {
        this.errorToast(err.error.message);
      }
    );
  }

  toggleAcceptReject(offeredUserId: string, offers) {
    this.offeredUserIdStatus[offeredUserId] =
      !this.offeredUserIdStatus[offeredUserId];

    this.offeredPriceArray.forEach((offer) => {
      if (offer.offeredUserId !== offeredUserId) {
        this.offeredUserIdStatus[offer.offeredUserId] = false;
      }
    });
  }

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

  

  ionViewWillEnter() {
    const slugData = this.route.snapshot.paramMap.get('id');
    let values;

    if (slugData != null) {
      values = slugData.split('-');
    }
    const slug = values[0];
    const adKaAdmin = values[1];
    this.adId = slug;

    this.storage.get('admin').then(
      (session) => {
        if (session != null) {
          this.sessionUser = session.userid;
          this.prodData(session.userid, slug);

          let timerData = {
            vid: session.userid,
            aid: slug,
          };

          //CODE FOR PROGRESS BAR
          this._apiService.getAdTimer(timerData).subscribe(
            (res: any) => {
              if (res) {
                this.increaseCounter(res, slug);
              }
            },
            (err) => {
              console.log(err);
            }
          );
          // ///////////////////////////
        } else {
          this.prodData(null, slug);
          this.showTimer = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );

    // ///////////////////////////////////////////////////////////////////////

    this.storage.get('admin').then(
      (session) => {
        if (session != null) {
          console.log('adKaAdmin:', adKaAdmin);
          if (session.userid == adKaAdmin) {
            this.chatCardDisplay = true;
            this.commentCardDisplay = false;
            this.showBack = false;

            // makeOffer card display for ad owner
            this.makeOfferSection = false;
            this.inputOffer = false;
            this.offerPrice = true;

            let offerData = {
              aid: slug,
              uid: adKaAdmin,
            };
            this._apiService.getAdOffers(offerData).subscribe(
              (res: any) => {
                console.log('getOfferAd:', res);
                if (res.length > 0) {
                  for (let i = 0; i < res.length; i++) {
                    let offerData = {
                      offeredUserId: res[i].id,
                      offeredUser: res[i].offered_by,
                      offeredPrice: res[i].offered_value,
                    };

                    this.offeredPriceArray.push(offerData);
                  }
                }
              },
              (err) => {
                console.log(err);
              }
            );
          } else {
            let getUserData = {
              aid: slug,
              uid: session.userid,
            };

            this._apiService.userAdOfferResponse(getUserData).subscribe(
              (res: any) => {
                if (res) {
                  this.inputOffer = false;
                  this.buyNow = true;
                }
              },
              (err) => {
                this.errorToast(err.error.message);
              }
            );
          }
          // ////////////////////
          let value = { aid: slug, uid: session.userid };
          console.log('loading data:', value);
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

                    if (session.userid == adKaAdmin) {
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
                        if (sameUser != adKaAdmin) {
                          this.chatUserList[sameUser] = com[i].username;
                        }
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
                    if (session.userid == adKaAdmin) {
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
        }
      },
      (err) => {
        console.log(err);
      }
    );

    // *************************************
  }

  // Function to show chat on click of particular user
  showUserChat(key) {
    this.commentedUserId = key;
    let data = {
      aid: this.adId,
      uid: key,
    };

    console.log('kedy:', data);

    this._apiService.showUserChat(data).subscribe(
      (res: any) => {
        console.log('Fetched chats:', res);
        this.comments = [];
        this.storage.get('admin').then((val) => {
          for (let i = 0; i < res.length; i++) {
            let obj = {};
            if (res[i].commenter == 'user' && res[i].user_id == val.userid) {
              obj['commenter'] = 'user';
              obj['username'] = res[i].username;
              obj['comment'] = res[i].comment;
              this.comments.push(obj);
            } else if (
              res[i].commenter == 'user' &&
              res[i].user_id != val.userid
            ) {
              {
                obj['commenter'] = 'owner';
                obj['username'] = res[i].username;
                obj['comment'] = res[i].comment;
                this.comments.push(obj);
              }
            }
          }

          setTimeout(() => {
            this.content.nativeElement.scrollTo({
              top: this.content.nativeElement.scrollHeight,
              behavior: 'smooth',
            });
          }, 100);
          this.chatCardDisplay = false;
          this.commentCardDisplay = true;
          this.showBack = true;

          console.log('New Comments:', this.comments);
        });

        // this.comments = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goToChatCard() {
    this.showBack = false;
    this.chatCardDisplay = true;
    this.commentCardDisplay = false;
  }

  @ViewChild('content', { static: false }) content: any = ElementRef;

  addComment() {
    if (this.sessionVal) {
      let commentData = {
        aid: this.adId,
        oid: this.userid,
        cuid: this.commentedUserId,
        comment: this.commentValue,
      };
      this.http
        .post('https://specbits.com/class2/fab/make-comment', commentData)
        .subscribe(
          (resCom: any) => {
            console.log('comment response:', resCom);
            this.commentValue = '';

            if (resCom == 'success') {
              if (this.userid == this.adKaAdmin) {
                this.showUserChat(this.commentedUserId);
              } else {
                let value = { aid: this.adId, uid: this.userid };
                this.http
                  .post('https://specbits.com/class2/fab/fetch-comment', value)
                  .subscribe(
                    (res: any) => {
                      console.log('fetch comment: ', res);
                      this.comments = res;
                      this.canComment = false;
                      this.allComments = true;
                      this.commentCardDisplay = true;

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
            } else {
              this.errorToast('Message sending failed.');
            }
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
