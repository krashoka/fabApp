import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { NavParams } from '@ionic/angular';
import { ApiService} from 'src/app/api.service';
import { DataService } from 'src/app/data.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  // data: any;

  categoryTitle: any;
  categories: any = [];

  constructor(private router: Router, private navCtrl: NavController, public _apiService:ApiService, private dataService: DataService, private storage: Storage) { this.storage.create();}

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

  // goToItemInfo(){
  //   this.router.navigate(['item-info']);  
  // }

  goToAddNewAd(){
    this.router.navigate(['add-new-advertisement']);  
  }

  goToCategories(datas: any, titles: any){
    let data = {cid: datas};

    this._apiService.sendCategory(data).subscribe((res:any)=>{
      console.log("check empty: ",res);
      if(res == 'empty'){
        this.router.navigate(['item-info']);
        console.log("give res",res)
      }else{
        let value = {
          newData: datas,
          title: titles
        }
        this.storage.set('category', value);
        // this.router.navigate(['categories']);
        // this.navCtrl.navigateForward('categories', { replaceUrl: true });

        // const currentUrl = this.router.url;
        // this.router.navigateByUrl('categories', { skipLocationChange: true }).then(() => {
        //   this.router.navigate([currentUrl], { replaceUrl: true });
        // });

        location.reload();
      } 
    });
  }

  ngOnInit() {
    this.navCtrl.navigateForward('categories', { replaceUrl: true });
    this.storage.get('category').then((value) => {
      let data = {cid: value.newData};

      this.categoryTitle = value.title;

      this._apiService.sendCategory(data).subscribe((res:any)=>{
        this.categories = res;
        console.log("What's response:", res);
      });
    });
  }

}
