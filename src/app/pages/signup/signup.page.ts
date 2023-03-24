import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { Select2Option } from 'ng-select2-component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user_mob: any;
  countries: any = [];
  selectedCountry: any;
  overlay = false;

  vcode: any;
  referalCode: any;

  isVerify = false;
  showSendVerify = true;
  isInputDisabled = false;

  constructor(
    private router: Router,
    public _apiService: ApiService,
    private toastCtrl: ToastController,
    private http: HttpClient
  ) {
    this.http
      .get('https://specbits.com/class2/fab/country')
      .subscribe((res: any) => {
        console.log(res);
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

  search(text: string) {
    this.countries = text
      ? (JSON.parse(JSON.stringify(this.countries)) as Select2Option[]).filter(
          (option) =>
            option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      : JSON.parse(JSON.stringify(this.countries));
  }

  sendVerify() {
    let data = {
      user_mob: this.user_mob,
      phonecode: this.selectedCountry,
      referral: this.referalCode,
    };

    console.log(data);

    this._apiService.sendVerify(data).subscribe(
      (res: any) => {
        console.log('SuccessMessage: ', res);
        if (res.exists) {
          this.inCompleteToast('Already registered! Complete your Profile');
          let navigationExtras: NavigationExtras = {
            queryParams: {
              uid: res.exists,
            },
          };
          this.router.navigate(['/complete-profile'], navigationExtras);
        } else if (res.registered) {
          this.inCompleteToast('Already registered! Please Login');
          this.router.navigate(['/login']);
        } else if (res != 'wrongref') {
          this.user_mob = res[1];
          this.isInputDisabled = true;
          this.successToast('Referral Code verified successfully.');
          this.showSendVerify = false;
          this.isVerify = true;
        } else {
          this.errorToast('Enter valid Referral code!');
          this.referalCode = '';
        }
      },
      (er: any) => {
        console.log('ErrorMessage: ', er);
        if (er.error.message == 'The user mob field is required.') {
          this.errorToast('Mobile number is required!');
        } else {
          this.errorToast('Invalid Number!');
        }
      }
    );
  }

  verifyCode() {
    let data = {
      user_mob: this.user_mob,
      phonecode: this.selectedCountry,
      vcode: this.vcode,
    };

    this._apiService.verifyCode(data).subscribe(
      (res: any) => {
        console.log(res);
        // this.user_mob= res;
        // this.isInputDisabled = true;
        if (res == 'success') {
          this.successToast('Account Verified.');
          this.user_mob = '';
          this.selectedCountry = '+973';
          this.vcode = '';
          this.showSendVerify = true;
          this.isVerify = false;
          this.isInputDisabled = false;
          this.router.navigate(['complete-profile']);
        } else this.errorToast(res);
      },
      (er: any) => {
        console.log(er.error.message);
        if (er.error.message == 'The vcode field is required.') {
          this.errorToast((er.error.message = 'Please enter OTP'));
        } else {
          this.errorToast((er.error.message = 'OTP must be a number'));
        }
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

  async inCompleteToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',
      cssClass: 'inCompleteToast',
    });
    toast.present();
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
    // this.phonecode = "+973"
  }
}
