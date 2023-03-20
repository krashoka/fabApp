import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  items: any[] = [];

  adDetails: any = [];

  // imageUrl: any;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    public http: HttpClient,
    private storage: Storage
  ) {
    this.storage.create();

    // this.http.get('http://localhost/fabapp/backend/crouselImg.php').subscribe(
    //   (res: any) => {
    //     console.log('Data fetched: ', res);
    //     this.imageUrl = res;
    //   },
    //   (error: any) => {
    //     console.log('ErrorMessage: ', error);
    //   }
    // );
  }

  option = {
    slidesPerView: 2,
    // centeredSlides: true,
    spaceBetween: 4,
  };

  goBack() {
    this.navCtrl.back();
  }

  goToProductDetails(ad) {
    this.http
      .post('https://specbits.com/class2/fab/display-comment', ad.ad_id)
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
    this.http
      .get('https://specbits.com/class2/fab/adds')
      .subscribe((res: any) => {
        console.log('Show Ad details:', res);

        // Displaying ads from database
        let dataLength = res.length;
        for (let i = 0; i < dataLength; i++) {
          this.items.push(i);
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
              adMobile = '+' + res[i][key].phonecode + ' ' + res[i][key].mobile;
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
            adMobile: adMobile
          };

          this.adDetails.push(data);
        }
      });
  }
}
