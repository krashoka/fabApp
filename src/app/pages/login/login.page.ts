import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Select2Option } from 'ng-select2-component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  countries: any = [];
  user_mob: any;
  user_pwd: any;
  selectedCountry: any;

  typePassword = 'password';
  showPassword: boolean = false;

  overlay = false;

  constructor(
    private router: Router,
    public _apiService: ApiService,
    private toastCtrl: ToastController,
    private storage: Storage,
    private http: HttpClient,
    private navController: NavController
  ) {
    this.storage.create();
  }

  ionViewWillEnter() {
    this.http
      .get('https://specbits.com/class2/fab/country')
      .subscribe((res: any) => {
        console.log('phoneCodes:', res);
        for (let i = 0; i < res.length; i++) {
          let data = {
            options: [{ value: res[i], label: '+' + res[i] }],
          };
          this.countries.push(data);

          // if (res[i] == 973) {
          this.selectedCountry = this.countries[i].options[0].value;
          // }
        }
      });
  }

  // Searching functionality in Select2
  search(text: string) {
    this.countries = text
      ? (JSON.parse(JSON.stringify(this.countries)) as Select2Option[]).filter(
          (option) =>
            option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      : JSON.parse(JSON.stringify(this.countries));
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.typePassword === 'password'
      ? (this.typePassword = 'text')
      : (this.typePassword = 'password');
  }

  loginUser() {
    let data = {
      phonecode: this.selectedCountry,
      user_mob: this.user_mob,
      user_pwd: this.user_pwd,
    };

    this._apiService.loginUser(data).subscribe(
      (res: any) => {
        if (res.loggedin) {
          let data = {
            loggedIn: true,
            username: res.username,
            userid: res.userid,
            phonecode: res.phonecode,
            usermob: res.mobile,
            referral: res.myref,
            myPoints: res.mypoints,
          };
          this.storage.set('admin', data);
          this.selectedCountry = '+973';
          this.user_mob = '';
          this.user_pwd = '';
          this.router.navigateByUrl(`home`);
        } else if (res == 'wrongpwd') {
          this.errorToast('Wrong Password !');
        } else if (res == 'blocked') {
          this.errorToast('Your account is blocked!');
        } else {
          this.errorToast('Number not registered!');
        }
      },
      (er: any) => {
        console.log('ErrorMessage: ', er);
        this.errorToast(er.error.message);
      }
    );
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

  goToHome() {
    this.router.navigate(['home']);
  }
}
