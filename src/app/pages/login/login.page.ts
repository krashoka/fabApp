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
export class LoginPage implements OnInit {
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
    private http: HttpClient
  ) {
    this.storage.create();

    this.http
      .get('https://specbits.com/class2/fab/country')
      .subscribe((res: any) => {
        console.log('Countries:', res);
        for (let i = 0; i < res.length; i++) {
          let data = {
            options: [{ value: res[i], label: '+' + res[i] }],
          };
          this.countries.push(data);

          if (res[i] == 973) {
            this.selectedCountry = this.countries[i].options[0].value;
          }
        }
      });
  }

  ngOnInit() {}

  // change(key: string, event: Event) {
  //   console.log(key, event);
  // }
  search(text: string) {
    this.countries = text
      ? (JSON.parse(JSON.stringify(this.countries)) as Select2Option[]).filter(
          (option) =>
            option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      : JSON.parse(JSON.stringify(this.countries));
  }
  // update(key: string, event: Select2UpdateEvent<any>) {
  //   console.log(event.value);
  // }

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

    console.log('login Data:', data);

    this._apiService.loginUser(data).subscribe(
      (res: any) => {
        console.log('Message From database: ', res);

        if (res[1].msg == 'success') {
          // this.storage.remove("admin");
          let data = {
            username: res[2].username,
            userid: res[3].userid,
            phonecode: res[4].phonecode,
            usermob: res[5].mobile,
          };
          this.storage.set('admin', data);
          this.selectedCountry = '+973';
          this.user_mob = '';
          this.user_pwd = '';
          // this.successToast("Logged in Successfully.");

          // this.storage.get('admin').then((value) => {
          //   console.log('Session value is', value);
          // });
          this.router.navigateByUrl('home');
        } else if (res == 'wrongpwd') {
          this.errorToast('Wrong Password !');
        } else {
          this.errorToast('Number not registered!');
        }
      },
      (er: any) => {
        console.log('ErrorMessage: ', er);
        if (er.error.errors.user_mob) {
          if (er.error.errors.user_mob == 'The user mob field is required.') {
            this.errorToast('Mobile number is required!');
          } else if (
            er.error.errors.user_mob == 'The user mob field must be a number.'
          ) {
            this.errorToast('Invalid Number!');
          }
        } else if (er.error.errors.user_pwd) {
          this.errorToast('Password is required!');
        }
      }
    );
  }

  // isAuthenticated(): Promise<boolean> {
  //   return this.storage.get('loggedin')
  //     .then(token => {
  //       return token ? true : false;
  //     });
  // }

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
