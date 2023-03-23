import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonText, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { Select2Option } from 'ng-select2-component';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  countries: any = [];
  selectedCountry: any;
  user_mob: any;
  overlay = false;
  countryCode: any;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) {
    this.storage.create();

    this.http
      .get('https://specbits.com/class2/fab/country')
      .subscribe((res: any) => {
        for (let i = 0; i < res.length; i++) {
          let data = {
            options: [{ value: res[i], label: '+' + res[i] }],
          };
          this.countries.push(data);

          if (res[i] == this.countryCode) {
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

  goToAddNewAd() {
    this.router.navigate(['add-new-advertisement']);
  }

  // @ViewChild('countryCode', { static: true })
  // countryCode: ElementRef | any;

  ngOnInit() {
    this.storage.get('admin').then((value) => {
      // this.phonecode.nativeElement.textContent = '+' + value.phonecode;
      this.countryCode = value.phonecode;

      this.user_mob = value.usermob;
    });
  }

  postMyAd() {
    this.storage.get('adDetails').then((val) => {
      let personalData = {
        uid: val.uid,
        aid: val.aid,
        phonecode: this.selectedCountry,
        mobile: this.user_mob,
      };

      this.http
        .post('https://specbits.com/class2/fab/post-ads', personalData)
        .subscribe(
          (res: any) => {
            console.log('Personal Information: ', res);
            if (res.msg == 'success') {
              this.successToast('Ad Posted Successfully.');
              this.router.navigate(['home']);
            } else {
              this.errorToast('Ad Posting Failed. Try Again!');
            }
          },
          (err: any) => {
            console.log('Error in posting: ', err);
            this.errorToast('Something went wrong!');
          }
        );
    });
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
