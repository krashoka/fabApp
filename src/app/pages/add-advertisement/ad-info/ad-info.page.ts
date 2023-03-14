import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ad-info',
  templateUrl: './ad-info.page.html',
  styleUrls: ['./ad-info.page.scss'],
})
export class AdInfoPage implements OnInit {

  adTitle: any;
  adDescription: any;

  constructor(private router: Router, private navCtrl: NavController, private toastCtrl: ToastController, private storage: Storage, private http: HttpClient) {
    this.storage.create();
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

  goToPersonalInfo(){
    this.storage.get('adDetails').then((val)=>{
      let adData = {
        uid: val.uid,
        aid: val.aid,
        formData:[this.adTitle, this.adDescription]
      }

      this.http.post("https://specbits.com/class2/fab/addTitle", adData).subscribe((res:any) => {
        console.log("adDetails received: ", res);
        if(res == 'blankField'){
          this.errorToast("All fields are required!");
        }else{
          this.router.navigate(['personal-info']); 
        }
      })
     
      
    }); 
  }

  goBack() {
    this.navCtrl.back();
  }

  goToAddNewAd(){
    this.router.navigate(['add-new-advertisement']);  
  }

  ngOnInit() {
  }

  async errorToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position:'top',
      cssClass: 'errorToast'
    });
    toast.present();
  }

}
