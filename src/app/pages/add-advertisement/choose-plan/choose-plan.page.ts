import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.page.html',
  styleUrls: ['./choose-plan.page.scss'],
})
export class ChoosePlanPage implements OnInit {
  planCards: any = [];

  constructor(private storage: Storage, private _apiService: ApiService, private router: Router, private  toastCtrl: ToastController) {
    this.storage.create();
  }

  ngOnInit() {
    this._apiService.fetchMembership().subscribe(
      (res: any) => {
        console.log('membership:', res);
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            let data = {
              id: res[i].id,
              title: res[i].title,
              heading: res[i].heading,
              description: res[i].description,
            };

            this.planCards.push(data);
          }
        }
      },
      (err) => {
        this.errorToast(err.error.message);
      }
    );
  }

  choosePlan(id) {
    this.storage.get('adDetails').then(
      (val) => {
        let userPlanData = {
          pid: id,
          aid: val.aid,
        };

        this._apiService.choosePlan(userPlanData).subscribe(
          (res: any) => {
            console.log('Choosen plan response:', res);
            if (res) {
              if (id != 0) {
                let data = {
                  aid: val.aid,
                };

                this._apiService.buyPlan(data).subscribe(
                  (res: any) => {
                    if (res) {
                      window.location.href = res;
                    }
                  },
                  (err) => {
                    this.errorToast(err.error.message);
                  }
                );
              } else {
                this.router.navigateByUrl('home');
                this.successToast('Ad Posted Successfully.');
              }
            }
          },
          (err) => {
            this.errorToast(err.error.message);
          }
        );
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
}
