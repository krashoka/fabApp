import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';  
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-commercialads',
  templateUrl: './commercialads.page.html',
  styleUrls: ['./commercialads.page.scss'],
})
export class CommercialadsPage implements OnInit {

  commercialImageUrl: string[] = [];

  constructor(private router: Router, private navCtrl: NavController, public http: HttpClient, private storage: Storage, private toastCtrl: ToastController, private _apiService: ApiService) {

    this.storage.create();

    // **************** For Commercial tab image *****************
    // this.http.get("http://localhost/fabapp/backend/commerceImg.php").subscribe((res: any) => {
        
    //   this.commercialImageUrl = res.map(imageName => 'http://localhost/fabapp/crouselimg/' + imageName);

    // },(error:any) => {
    //   console.log("ErrorMessage: ", error)
    // });
  }

  fetchAdminData() {
    this.storage.get('admin').then(
      (val) => {
        if (val != null) {
          let data = {
            uid: val.userid,
          };

          this._apiService.fetchAdminData(data).subscribe(
            (res: any) => {
              if (res == 'code-1') {
                this.errorToast('User not found');
              } else if (res == 'code-0') {
                this.errorToast('Session Error');
              } else {
                let newData = {
                  username: res.username,
                  userid: res.userid,
                  phonecode: res.phonecode,
                  usermob: res.mobile,
                  referral: res.myref,
                  myPoints: res.mypoints,
                  notifications: res.notifications
                };
                this.storage.set('admin', newData);
              }
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.fetchAdminData();
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

  async errorToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',
      cssClass: 'errorToast',
    });
    toast.present();
  }

  async successToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',
      cssClass: 'successToast',
    });
    toast.present();
  }

}
