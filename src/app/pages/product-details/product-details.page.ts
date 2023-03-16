import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  adTitle: any;
  price: any;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage
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
      this.adTitle = val.adTitle;
      this.price = val.itemInfo[4];
    });
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
