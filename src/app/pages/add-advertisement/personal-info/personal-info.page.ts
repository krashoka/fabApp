import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonText, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {

  mobileNumber: number = 0;

  constructor(private router: Router, private navCtrl: NavController, private storage: Storage) {
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

  goBack() {
    this.navCtrl.back();
  }

  goToAddNewAd(){
    this.router.navigate(['add-new-advertisement']);  
  }

  @ViewChild('countryCode', { static: true })
  countryCode: ElementRef | any;

  ngOnInit() {

    this.storage.get('admin').then((value) => {
      this.countryCode.nativeElement.textContent = "+" + value.phonecode;

      this.mobileNumber = value.usermob;
    });
  }

}
