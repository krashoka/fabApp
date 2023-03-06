import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  items:any[] = [];

  imageUrl: string[] = [];

  constructor(private navCtrl: NavController, public http: HttpClient) { 

    this.http.get("http://localhost/fabapp/backend/crouselImg.php").subscribe((res: any) => {
        
      // console.log("Data fetched successfully: ",res);
      for(let i=0; i<res.length; i++){
        this.imageUrl.push('http://localhost/fabapp/crouselimg/' + res[i]);
      }

    },(error:any) => {
      console.log("ErrorMessage: ", error)
    });
   }

  option = {
    slidesPerView: 2,
    // centeredSlides: true,
    spaceBetween: 4,
  }

  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
    for (let i = 1; i < 51; i++) {
      this.items.push(i);
    }
  }



}
