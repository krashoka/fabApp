import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';
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
  commentDisabled = true;
  commentValue: any;
  sessionVal = false;
  userid: any;
  comments: any = [];
  adMobile: any;
  adminSessionId: any;

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

  favoritesToggle() {
    if (this.flag) {
      this.removeFromFavorites();
      this.flag = false;
    } else {
      this.addToFavorites();
      this.flag = true;
    }
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

  option = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 2,
  };

  option2 = {
    slidesPerView: 4,
    // centeredSlides: true,
    loop: true,
    spaceBetween: 40,
    // autoplay:true,
  };

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

  async ionViewWillEnter() {
    // TESTING CODE FOR PROGRESS BAR
    // setTimeout(() => {
    // this.timeOnPage += 5000;
    this.increaseCounter();
    // }, 5000);
    // ///////////////////////////

    await this.storage.get('admin').then((val) => {
      this.sessionUser = val.userid;
    });

    await this.storage.get('adId').then((val) => {
      console.log('aDiD:', val);
      this.adAdmin = val.adINFO.adAdmin;
      this.adId = val.adINFO.ad_id;
      this.adTitle = val.adINFO.adTitle;
      this.price = val.adINFO.itemObj.Price;
      this.prodDetails = val.adINFO.itemObj;
      this.adDetail = val.adINFO.adDetail;
      this.adImage = val.adINFO.imagesArray[0];
      this.adMobile = val.adINFO.adMobile;

      this.storage.get('admin').then((session) => {
        console.log('admin session:', session);
        if (session != null) {
          console.log('User is in session');
          this.adminSessionId = session.userid;
          if (val.comment.length != 0) {
            this.canComment = false;
            this.allComments = true;

            if (session.userid == val.adINFO.adAdmin) {
              this.chatCardDisplay = true;
              this.commentCardDisplay = false;
              this.makeOffer = false;

              // Filtering number of users commented on a particular ad.
              for (let i = 0; i < val.comment.length; i++) {
                let sameUser = val.comment[i].user_id;
                console.log('sameUser:', sameUser);
                // let chats = {};
                // chats[sameUser]
                // chats['time'] = val.comment[i].created_at;
                this.chatUserList[sameUser] = val.comment[i].username;
              }

              console.log('chatUserList:', this.chatUserList);
            } else {
              this.chatCardDisplay = false;
              this.commentCardDisplay = true;
              this.comments = val.comment;
              this.makeOffer = true;
              console.log('All comments:', this.comments);
            }
          } else {
            if (session.userid == val.adINFO.adAdmin) {
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
      });
    });
  }

  // Function to show chat on click of particular user
  showUserChat(key) {
    let data = {
      aid: this.adId,
      uid: key,
    };

    this._apiService.showUserChat(data).subscribe((res: any) => {
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
    });
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
        .subscribe((res: any) => {
          console.log('comment response:', res);
          this.commentValue = '';

          let value = { aid: this.adId, uid: this.userid };
          this.http
            .post('https://specbits.com/class2/fab/fetch-comment', value)
            .subscribe((res: any) => {
              this.comments = res;

              setTimeout(() => {
                this.content.nativeElement.scrollTo({
                  top: this.content.nativeElement.scrollHeight,
                  behavior: 'smooth',
                });
              }, 100);
            });
        });
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
      .subscribe((res: any) => {
        this.comments = res;
        setTimeout(() => {
          this.content.nativeElement.scrollTo({
            top: this.content.nativeElement.scrollHeight,
            behavior: 'smooth',
          });
        }, 100);
      });
  }
}
