import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NavController } from '@ionic/angular';
import {Storage} from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {

  showAccount = false;
  showLogin = true;

  
  constructor(private router: Router, public _apiService:ApiService, private toastCtrl: ToastController, private storage: Storage) {this.storage.create(); }

  logout() {
    this.storage.remove("admin");
    this.storage.get('admin').then((value) => {
      if(value == null) {
        this.router.navigate(['login']);
      }
    }); 
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

async successToast(a){
  const toast = await this.toastCtrl.create({
    message: a,
    duration: 1500,
    position:'top',
    cssClass: 'successToast'
  });
  toast.present();
}

  ngOnInit() {
    this.storage.get('admin').then((value) => {
      console.log('Session value is', value.userid);
      if(value.userid != null) {
        this.showAccount = true;
        this.showLogin = false;
      }
    }); 
  }


  isElementActive(routePath: string): boolean {
    return this.router.url.includes(routePath);
  }

  goToLogin(){
    this.router.navigate(['login'])
  }

  goToHome() {  
    this.router.navigate(['home']);  
  } 

  goToStickyAds() {  
    this.router.navigate(['products']);  
  } 

  goToCommercialAds() {  
    this.router.navigate(['commercialads']);  
  }  

  goToAddNewAd(){
    this.storage.get('admin').then((value) => {
      if(value != null) this.router.navigate(['add-new-advertisement']);
      else this.router.navigate(['login']);
    });  
  }

}
