import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-info',
  templateUrl: './ad-info.page.html',
  styleUrls: ['./ad-info.page.scss'],
})
export class AdInfoPage implements OnInit {

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

  goToPersonalInfo(){
    this.router.navigate(['personal-info']);  
  }

  goBack() {
    this.navCtrl.back();
  }

  goToAddNewAd(){
    this.router.navigate(['add-new-advertisement']);  
  }

  ngOnInit() {
  }

}
