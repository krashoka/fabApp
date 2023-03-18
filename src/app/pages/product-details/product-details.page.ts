import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  adTitle: any;
  adDetail: any;
  adId: any;
  price: any;
  prodDetails: any;
  adImage: any;
  commentDisabled = true;
  commentValue: any;
  sessionVal = false;
  userid: any;
  comments: any = [];

  canComment = true;
  allComments = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private http: HttpClient
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

  ngOnInit() {
    this.storage.get('adId').then((val) => {
      console.log('aDiD:', val);
      this.adId = val.adINFO.ad_id;
      this.adTitle = val.adINFO.adTitle;
      this.price = val.adINFO.itemObj.Price;
      this.prodDetails = val.adINFO.itemObj;
      this.adDetail = val.adINFO.adDetail;
      this.adImage = val.adINFO.imagesArray[0];

      this.storage.get('admin').then((session) => {
        console.log('admin session:', session);
        if (session != null) {
          console.log('User is in session');
          if (val.comment != 'blank') {
            this.canComment = false;
            this.allComments = true;
            this.comments = val.comment;
          } else {
            this.commentDisabled = false;
            this.canComment = true;
            this.allComments = false;
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
  }
}
