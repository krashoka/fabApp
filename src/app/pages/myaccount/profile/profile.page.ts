import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  username: any;
  userid: any;

  newName: any;
  currentPassword: any;
  newPassword: any;
  confirmPassword: any;

  typePassword = 'password';
  typeNewPassword = 'password';
  typeConfirmPassword = 'password';

  showPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private router: Router,
    private storage: Storage,
    private _apiService: ApiService,
    private toastCtrl: ToastController
  ) {
    this.storage.create();

    // this.storage.get('admin').then((val) => {
    //   console.log(val);
    //   this.username = val.username;
    //   this.userid = val.userid;
    // });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.typePassword === 'password'
      ? (this.typePassword = 'text')
      : (this.typePassword = 'password');
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
    this.typeNewPassword === 'password'
      ? (this.typeNewPassword = 'text')
      : (this.typeNewPassword = 'password');
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.typeConfirmPassword === 'password'
      ? (this.typeConfirmPassword = 'text')
      : (this.typeConfirmPassword = 'password');
  }

  goToMyAccount() {
    this.router.navigate(['myaccount']);
  }

  emptyName() {
    this.newName = '';
  }

  emptyPassword() {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  changeName() {
    let data = {
      uid: this.userid,
      name: this.newName,
    };

    this._apiService.changeName(data).subscribe(
      (res: any) => {
        console.log('new Name:', res);

        if (res == 'fail') this.errorToast('Sorry, Name not updated!');
        else {
          this.successToast('Name updated successfully.');
          this.newName = '';
          this.ionViewWillEnter();
        }
      },
      (error) => {
        console.log(error);
        this.errorToast(error.error.message);
      }
    );
  }

  fetchAdminData() {
    this.storage.get('admin').then((val) => {
      let data = {
        uid: val.userid,
      };

      console.log('fetsldf:', data);

      this._apiService.fetchAdminData(data).subscribe((res: any) => {
        console.log('my response:', res);
        if (res == 'code-1') {
          this.errorToast('User not found');
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

          this.username = res.username;
          this.userid = res.userid;
        }
      });
    });
  }

  changePassword() {
    let data = {
      uid: this.userid,
      currentPwd: this.currentPassword,
      newPwd: this.newPassword,
      confirmPwd: this.confirmPassword,
    };

    this._apiService.changePassword(data).subscribe(
      (res: any) => {
        if (res == 'success') {
          this.successToast('Password updated successfully.');
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        } else if (res == 'fail') {
          this.errorToast('Something went wrong! Password updation failed');
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        } else {
          this.errorToast('Invalid current password!');
        }
      },
      (err) => {
        console.log(err);
        if (err.error.errors.currentPwd)
          this.errorToast(err.error.errors.currentPwd[0]);
        else if (err.error.errors.newPwd)
          this.errorToast(err.error.errors.newPwd[0]);
        else if (err.error.errors.confirmPwd)
          this.errorToast(err.error.errors.confirmPwd[0]);
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

  ionViewWillEnter() {
    this.fetchAdminData();
  }
}
