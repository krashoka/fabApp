import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
// import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  adDetails: any = [];

  categoryTitle: any;

  categories: any = [];

  newUrl: any = [];

  waLink = 'https://wa.me/';

  totalAds: any;

  breadcrums: any = [];

  // isArrow = true;

  // imageUrl: any;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    public http: HttpClient,
    private storage: Storage,
    public _apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.storage.create();
  }

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

  goToSticky(datas: any, titles: any, parent: any) {
    let data = { cid: datas };

    console.log('newTitttltltlt:', titles);
    if (parent == '0') {
      this.storage.set('catTitle', titles);
      this.router.navigateByUrl(`products/${datas}`);
    } else {
      this._apiService.sendCategory(data).subscribe((res: any) => {
        console.log('check empty: ', res);
        if (res == 'empty') {
          console.log('give res', res);
        } else {
          this.breadcrums.push(titles);
          this.router.navigateByUrl(`products/${datas}`);
        }
      });
    }
  }

  ngOnInit() {
    // window.addEventListener('resize', this.onResize.bind(this));

    const slug = this.route.snapshot.paramMap.get('slug');
    console.log('SlugValue:', slug);

    let cidData = {
      cid: slug,
    };

    this._apiService.fetchAds(cidData).subscribe((res: any) => {
      console.log('Show Ad details:', res);
      // Displaying ads from database
      let dataLength = res.length;

      this.totalAds = dataLength;

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
            adMobile = '+' + res[i][key].phonecode + ' ' + res[i][key].mobile;
          }

          if (key === 'addData') {
            for (let j = 0; j < res[i][key].length; j++) {
              for (let val in res[i][key][j]) {
                if (val == 'main_data') itemInfo.push(res[i][key][j][val]);
                if (val == 'label') itemLabel.push(res[i][key][j][val]);
                if (val == 'add_id') ad_id = res[i][key][j][val];
              }
            }
          }

          if (key === 'addImage') {
            for (let j = 0; j < res[i][key].length; j++) {
              for (let val in res[i][key][j]) {
                if (val == 'image_name') imagesArray.push(res[i][key][j][val]);
              }
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
    });

    if (slug == '0') {
      this.http.get('https://specbits.com/class2/fab/index').subscribe(
        (res: any) => {
          this.categories = res;

          console.log('product from home:', res);
        },
        (error: any) => {
          console.log('ErrorMessage: ', error);
        }
      );

      this.storage.get('catTitle').then((val) => {
        this.categoryTitle = val;
        this.breadcrums.push(val);
      });
    } else {
      this._apiService.sendCategory(cidData).subscribe((res: any) => {
        this.categories = res;
        console.log("What's response:", res);
      });

      this.storage.get('catTitle').then((val) => {
        this.categoryTitle = val;
        this.breadcrums.push(val);
      });
    }
  }

  // onResize() {
  //   if (window.innerWidth >= 992) {
  //     this.isArrow = false;
  //   }else{
  //     this.isArrow = true;
  //   }
  // }
}
