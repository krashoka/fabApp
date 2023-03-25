import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // showCommercial= false;
  // showHomeContent = true;

  imageUrl: any;
  commercialImageUrl: string[] = [];

  categories: any = [];

  adDetails: any = [];

  waLink = 'https://wa.me/';

  constructor(
    private router: Router,
    public http: HttpClient,
    private storage: Storage,
    private _apiService: ApiService
  ) {
    this.storage.create();

    // **************** For Categories Icons Section *****************
    this.http.get('https://specbits.com/class2/fab/index').subscribe(
      (res: any) => {
        this.categories = res;

        console.log('IconCat:', res);
      },
      (error: any) => {
        console.log('ErrorMessage: ', error);
      }
    );
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
    loop: true,
    spaceBetween: 40,
    autoplay: true,
  };

  option3 = {
    slidesPerView: 2,
    // centeredSlides: true,
    loop: true,
    spaceBetween: 2,
    autoplay: true,
  };

  goToSticky(datas: any, titles: any) {
    let data = { cid: datas };

    this.storage.set('catTitle', titles);

    this._apiService.sendCategory(data).subscribe((res: any) => {
      // console.log('check empty: ', res);
      if (res == 'empty') {
        this.router.navigate(['home']);
      } else {
        this.router.navigateByUrl(`products/${datas}`);
      }
    });

    console.log('homeIconCID:', data);
  }

  goToStickyAds(datas: any, title: any) {
    this.storage.set('catTitle', title);
    this.router.navigateByUrl(`products/${datas}`);
  }

  goToAddNewAd() {
    this.router.navigate(['add-new-advertisement']);
  }

  goToCommercialAds() {
    this.router.navigate(['commercialads']);
  }

  goToProductDetails(ad) {
    let value = { aid: ad.ad_id };
    this.http
      .post('https://specbits.com/class2/fab/display-comment', value)
      .subscribe((res: any) => {
        let data = {
          adINFO: ad,
          comment: res,
        };
        this.storage.set('adId', data);
        this.router.navigate(['product-details']);
      });
  }

  ngOnInit() {
    window.addEventListener('resize', this.onResize.bind(this));

    this.http
      .get('https://specbits.com/class2/fab/adds')
      .subscribe((res: any) => {
        console.log('Show Ad details:', res);

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
          for (let key in res[i]) {
            if (key === 'addHeadings') {
              adTitle = res[i][key].add_title;
              adDetail = res[i][key].add_detail;
              adAdmin = res[i][key].user_id;
            }

            if (key === 'addPersonalInfo') {
              adMobile = res[i][key].phonecode + res[i][key].mobile;
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
          };

          this.adDetails.push(data);
        }

        console.log('Total ad Data:', this.adDetails);
      });
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
