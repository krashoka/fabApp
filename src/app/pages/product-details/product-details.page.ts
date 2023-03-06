import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

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

  goToAddNewAd(){
    this.router.navigate(['add-new-advertisement']);  
  }

  option = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 2,
  }

  option2 = {
    slidesPerView: 4,
    // centeredSlides: true,
    loop: true,
    spaceBetween: 40,
    // autoplay:true,
  }

  ngOnInit() {
  }

}
