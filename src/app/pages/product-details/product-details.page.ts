import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
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

  chatCardDisplay: any;
  commentCardDisplay: any;

  waLink = 'https://wa.me/';

  canComment = true;
  allComments = false;

  counter = 0;
  timeOnPage = 0;
  progressBarWidth = '0%';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
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

  ngOnInit() {
    // TESTING CODE FOR PROGRESS BAR
    // setTimeout(() => {
    // this.timeOnPage += 5000;
    this.increaseCounter();
    // }, 5000);
    // ///////////////////////////

    this.storage.get('adId').then((val) => {
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
