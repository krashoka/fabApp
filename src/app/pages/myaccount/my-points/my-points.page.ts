import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-my-points',
  templateUrl: './my-points.page.html',
  styleUrls: ['./my-points.page.scss'],
})
export class MyPointsPage implements OnInit {
  username: any;
  pointsData: any = [];
  myPoints: any;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService
  ) {
    this.storage.create();

    this.storage.get('admin').then((val) => {
      console.log(val);

      this.username = val.username;
    });
  }

  showPoints = false;
  showRedeem = true;

  onClickPoints() {
    this.showPoints = !this.showPoints;
    this.showRedeem = !this.showRedeem;
  }

  onClickRedeem() {
    this.showPoints = !this.showPoints;
    this.showRedeem = !this.showRedeem;
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
