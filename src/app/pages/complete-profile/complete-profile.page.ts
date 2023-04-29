import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
})
export class CompleteProfilePage implements OnInit {
  username: any;
  password: any;
  confirmPassword: any;
  userId: any;

  typePassword = 'password';
  typeConfirmPassword = 'password';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private _apiService: ApiService,
    private toastCtrl: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage
  ) {
    this.storage.create();
  }

  emptyPassword() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.typePassword === 'password'
      ? (this.typePassword = 'text')
      : (this.typePassword = 'password');
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.typeConfirmPassword === 'password'
      ? (this.typeConfirmPassword = 'text')
      : (this.typeConfirmPassword = 'password');
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.userId = slug;
  }

  saveProfile() {
    let data = {
      name: this.username,
      pwd: this.password,
      confirmpwd: this.confirmPassword,
      uid: this.userId,
    };
    console.log('fsdfsf:', data);
    this._apiService.completeProfile(data).subscribe(
      (res: any) => {
        console.log('complete Profile response:', res);
        if (res.complete) {
          this.errorToast(res.complete);
        } else if (res.sorry) {
          this.errorToast(res.sorry);
        } else if (res.dberror) {
          this.errorToast(res.sorry);
        } else {
          let data = {
            username: res.username,
            userid: res.userid,
            phonecode: res.phonecode,
            usermob: res.usermob,
          };

          this.storage.set('admin', data);
          this.router.navigateByUrl('/home');
          this.successToast('Profile completed successfully');
        }
      },
      (err) => {
        console.log('profile error:', err);
        if (err.error.errors.name) this.errorToast(err.error.errors.name[0]);
        else if (err.error.errors.pwd) this.errorToast(err.error.errors.pwd[0]);
        else if (err.error.errors.confirmpwd)
          this.errorToast(err.error.errors.confirmpwd[0]);
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
}
