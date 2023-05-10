import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-points',
  templateUrl: './my-points.page.html',
  styleUrls: ['./my-points.page.scss'],
})
export class MyPointsPage implements OnInit {
  username: any;
  pointsData: any = [];
  myPoints: any;
  heading: any;
  subHeading: any;
  inputVal: any;
  userID: any;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService,
    private toastCtrl: ToastController
  ) {
    this.storage.create();

    this.storage.get('admin').then((val) => {
      console.log(val);

      this.username = val.username;
      this.userID = val.userid;
    });
  }

  showPoints = false;
  showRedeem = true;

  onClickPoints() {
    this.showPoints = !this.showPoints;
    this.showRedeem = !this.showRedeem;
    this.fetchAdminData();
    this.ngOnInit();
  }

  onClickRedeem() {
    this.showPoints = !this.showPoints;
    this.showRedeem = !this.showRedeem;

    this._apiService.redeemOnLoad().subscribe(
      (res: any) => {
        if (res) {
          this.heading = res.heading;
          this.subHeading = res.subHeading;
        }
      },
      (err) => {
        this.errorToast(err);
      }
    );
  }

  submit() {
    let data = {
      uid: this.userID,
      points: this.inputVal,
    };

    this._apiService.makeRedeemRequest(data).subscribe(
      (res: any) => {
        if (res) {
          this.successToast('Request sent successfully');
          this.inputVal = '';
          let count = 0;
          let counter = setInterval(() => {
            count++;
            this.fetchAdminData();
            this.ngOnInit();
            if (count == 3) {
              clearInterval(counter);
            }
          }, 100);
        } else {
          this.errorToast('Request sent failed. Try Again!');
        }
      },
      (err) => {
        this.errorToast(err.error.message);
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
    this.storage.get('admin').then(
      (val) => {
        console.log('redeme:', val);
        if (val != null) {
          this.myPoints = val.myPoints;
          let data = {
            uid: val.userid,
          };
          this._apiService.fetchUserPoints(data).subscribe(
            (res: any) => {
              console.log('User Points:', res);
              if (res.length > 0) {
                for (let i = 0; i < res.length; i++) {
                  let adTitle = '';
                  if (res[i].add_title) {
                    adTitle = ` ( ${res[i].add_title} )`;
                  }

                  let points = {
                    adTitle: adTitle,
                    pointsFor: res[i].points_for,
                    credit: res[i].credited_points,
                    debit: res[i].deducted_points,
                  };

                  this.pointsData.push(points);
                }
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

  goBack() {
    this.navCtrl.back();
  }
}
