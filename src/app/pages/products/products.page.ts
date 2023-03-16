import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  items: any[] = [];

  adDetails: any = [];

  // imageUrl: any;

  constructor(private navCtrl: NavController, public http: HttpClient) {
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
          let ad_id;
          for (let key in res[i]) {
            if (key === 'addHeadings') {
              adTitle = res[i][key].add_title;
              adDetail = res[i][key].add_detail;
            }
            if (key === 'addData') {
              for (let j = 0; j < res[i][key].length; j++) {
                // if (j == 4) {
                for (let val in res[i][key][j]) {
                  if (val == 'main_data') itemInfo.push(res[i][key][j][val]);

                  if (val == 'add_id') ad_id = res[i][key][j][val];
                }
                // }
              }
            }
          }

          let data = {
            adTitle: adTitle,
            itemInfo: itemInfo,
            adDetail: adDetail,
          };

          this.adDetails.push(data);
        }
      });
  }
}
