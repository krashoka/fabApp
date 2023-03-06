import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadimage-page',
  templateUrl: './uploadimage-page.page.html',
  styleUrls: ['./uploadimage-page.page.scss'],
})
export class UploadimagePagePage implements OnInit {

  constructor(private router: Router, private navCtrl: NavController) { }

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

  goToAdInfo(){
    this.router.navigate(['ad-info']);  
  }

  goToAddNewAd(){
    this.router.navigate(['add-new-advertisement']);  
  }

  ngOnInit() {
  }

}
