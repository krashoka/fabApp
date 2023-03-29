import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-my-points',
  templateUrl: './my-points.page.html',
  styleUrls: ['./my-points.page.scss'],
})
export class MyPointsPage implements OnInit {
  username: any;

  constructor(private navCtrl: NavController, private storage: Storage) {
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

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }
}
