import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

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

  constructor(
    private router: Router,
    public http: HttpClient,
    private storage: Storage
  ) {
    this.storage.create();

    this.http.get('http://localhost/fabapp/backend/crouselImg.php').subscribe(
      (res: any) => {
        console.log('Data fetched successfully: ', res);

        this.imageUrl = res;
      },
      (error: any) => {
        console.log('ErrorMessage: ', error);
      }
    );

    // **************** For Commercial tab image *****************
    this.http.get('http://localhost/fabapp/backend/commerceImg.php').subscribe(
      (res: any) => {
        this.commercialImageUrl = res.map(
          (imageName) => 'http://localhost/fabapp/crouselimg/' + imageName
        );
      },
      (error: any) => {
        console.log('ErrorMessage: ', error);
      }
    );

    // **************** For Categories Icons Section *****************
    this.http.get('https://specbits.com/class2/fab/index').subscribe(
      (res: any) => {
        this.categories = res;

        console.log(res);
      },
      (error: any) => {
        console.log('ErrorMessage: ', error);
      }
    );
  }

  topCrousel(data) {
    console.log(data);

    this.http
      .get('http://localhost/fabapp/backend/crouselImg.php', data)
      .subscribe((res: any) => {
        let newData = { cid: data };

        // this._apiService.sendCategory(data).subscribe((res:any)=>{
        //   console.log("check empty: ",res);
        //   if(res == 'empty'){
        //     this.router.navigate(['item-info']);
        //   }else{
        // let value = {
        //   newData: datas,
        //   title: titles
        // }
        this.storage.set('homeCrousel', newData);
        this.router.navigate(['commercialads']);
        //   }
        // });
      });
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
    centeredSlides: true,
    loop: true,
    // spaceBetween: 2,
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

  goToStickyAds() {
    this.router.navigate(['products']);
  }

  goToAddNewAd() {
    this.storage.get('admin').then((value) => {
      if (value.userid != null) this.router.navigate(['add-new-advertisement']);
      else this.router.navigate(['login']);
    });
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
          for (let key in res[i]) {
            if (key === 'addHeadings') {
              adTitle = res[i][key].add_title;
              adDetail = res[i][key].add_detail;
              adAdmin = res[i][key].user_id;
            }
            if (key === 'addData') {
              for (let j = 0; j < res[i][key].length; j++) {
                // if (j == 4) {
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
                // if (j == 4) {
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
          };

          console.log('Whole Data: ', data.imagesArray[0]);
          this.adDetails.push(data);
        }
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
