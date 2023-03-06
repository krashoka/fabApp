import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';  
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-commercialads',
  templateUrl: './commercialads.page.html',
  styleUrls: ['./commercialads.page.scss'],
})
export class CommercialadsPage implements OnInit {

  commercialImageUrl: string[] = [];

  constructor(private router: Router, private navCtrl: NavController, public http: HttpClient) { 
    // **************** For Commercial tab image *****************
    this.http.get("http://localhost/fabapp/backend/commerceImg.php").subscribe((res: any) => {
        
      this.commercialImageUrl = res.map(imageName => 'http://localhost/fabapp/crouselimg/' + imageName);

    },(error:any) => {
      console.log("ErrorMessage: ", error)
    });
  }

  ngOnInit() {
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

}
