import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService} from 'src/app/api.service';
import { DataService } from 'src/app/data.service';
import { Storage } from '@ionic/storage-angular';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-add-new-advertisement',
  templateUrl: './add-new-advertisement.page.html',
  styleUrls: ['./add-new-advertisement.page.scss'],
})
export class AddNewAdvertisementPage implements OnInit {

  categories: any = [];

  constructor(private router: Router, public http: HttpClient, private navController: NavController, public _apiService:ApiService, private dataService: DataService,private storage: Storage) {

    this.storage.create();

    // **************** For Categories Icons Section *****************
    this.http.get("https://specbits.com/class2/fab/index").subscribe((res: any) => {

      this.categories = res;
      console.log(res);

    },(error:any) => {
      console.log("ErrorMessage: ", error)
    });
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

  goToCategories(datas: any, titles: any){ 

    let data = {cid: datas};

    this._apiService.sendCategory(data).subscribe((res:any)=>{
      console.log("check empty: ",res);
      if(res == 'empty'){
        this.router.navigate(['item-info']);
      }else{
        let value = {
          newData: datas,
          title: titles
        }
        this.storage.set('category', value);
        this.router.navigate(['categories']);
      } 
    });
  }

  goToAddNewAd(){
    this.router.navigate(['add-new-advertisement']);  
  }

  ngOnInit() {
  }

}
