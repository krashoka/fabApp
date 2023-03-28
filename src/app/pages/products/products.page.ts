import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/breadcrumb.service';

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

  // breadcrumbs: any = [];

  // isArrow = true;

  // imageUrl: any;

  breadcrumbs: { title: string; link: string }[];

  currentUrl: string = 'http://localhost:8100/fabApp/';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    public http: HttpClient,
    private storage: Storage,
    public _apiService: ApiService,
    private route: ActivatedRoute,
    public breadcrumbService: BreadcrumbService
  ) {
    this.storage.create();

    // this.currentUrl = this.router.url;

    this.breadcrumbs = this.breadcrumbService.getBreadcrumbs();
  }

  // breadcrumbsFun(titles) {
  //   const slug = this.route.snapshot.paramMap.get('slug');
  //   let breadcrumbs: Breadcrumb[] = [];
  //   if (slug == '0') {
  //     breadcrumbs.push({ title: 'Home', link: `${this.currentUrl}` });
  //   } else {
  //     breadcrumbs.push({ title: 'Home', link: `${this.currentUrl}` });
  //     breadcrumbs.push({
  //       title: `${titles}`,
  //       link: `${this.currentUrl}/products/${slug}`,
  //     });
  //   }

  //   this.breadcrumbService.setBreadcrumbs(breadcrumbs);
  // }

  goBack() {
    this.breadcrumbService.clearBreadcrumbs();
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
    // this.breadcrumbsFun(titles);

    // const title = this.route.snapshot.data['titles'];
    const link = `${this.currentUrl}/products/${datas}-${titles}`;

    // Add the breadcrumb to the breadcrumb trail
    this.breadcrumbService.addBreadcrumb(titles, link);

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
          // this.breadcrumbs.push(titles);
          this.router.navigateByUrl(`products/${datas}-${titles}`);
        }
      });
    }
  }

  ngOnInit() {
    // window.addEventListener('resize', this.onResize.bind(this));

    // this.breadcrumbService;

    const slug = this.route.snapshot.paramMap.get('slug');

    console.log('SlugValue:', slug);
    let titles;
    let id;

    if (slug) {
      titles = slug.replace(/[^a-zA-Z]/g, '');
      id = slug.replace(/\D/g, '');
    }

    let cidData = {
      cid: id,
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

    if (id == '0') {
      this.http.get('https://specbits.com/class2/fab/index').subscribe(
        (res: any) => {
          this.categories = res;

          console.log('product from home:', res);
        },
        (error: any) => {
          console.log('ErrorMessage: ', error);
        }
      );

      // const link = `${this.currentUrl}/products/${slug}`;
      // this.breadcrumbService.addBreadcrumb(titles, link);

      this.storage.get('catTitle').then((val) => {
        this.categoryTitle = val;
      });
    } else {
      this._apiService.sendCategory(cidData).subscribe((res: any) => {
        this.categories = res;
        console.log("What's response:", res);
      });

      // const link = `${this.currentUrl}/products/${slug}`;
      // this.breadcrumbService.addBreadcrumb(titles, link);

      this.storage.get('catTitle').then((val) => {
        this.categoryTitle = val;
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
