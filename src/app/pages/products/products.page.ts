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

  imageUrl: any;

  constructor(private navCtrl: NavController, public http: HttpClient) {
    this.http.get('http://localhost/fabapp/backend/crouselImg.php').subscribe(
      (res: any) => {
        console.log('Data fetched: ', res);
        this.imageUrl = res;
      },
      (error: any) => {
        console.log('ErrorMessage: ', error);
      }
    );
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
    for (let i = 1; i < 51; i++) {
      this.items.push(i);
    }
  }
}
