import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage-angular';
import { Select2Option } from 'ng-select2-component';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.page.html',
  styleUrls: ['./item-info.page.scss'],
})
export class ItemInfoPage implements OnInit {
  items: any = [];
  catTitle: any;
  showNextBtn = true;
  overlay = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    public http: HttpClient,
    private storage: Storage
  ) {
    this.storage.create();

    this.storage.get('catDetails').then((val) => {
      let newValue = {
        cid: val.cid,
      };

      this.http
        .post('https://specbits.com/class2/fab/newform', newValue)
        .subscribe(
          (res: any) => {
            console.log(res.length);

            if (res.length < 1) this.showNextBtn = false;

            const indices = res.reduce((acc, cur, index) => {
              if (Array.isArray(cur)) {
                acc.push(index);
              }
              return acc;
            }, []);

            for (let i = 0; i < res.length; i++) {
              if (res[i].type == 'select') {
                for (let m = 0; m < indices.length; m++) {
                  let optionsData: any = [];

                  if (
                    res[i].form_field_id == res[indices[m]][0].form_fields_id
                  ) {
                    for (let j = 0; j < res[indices[m]].length; j++) {
                      let data = {
                        options: [
                          {
                            value: res[indices[m]][j].value,
                            label: res[indices[m]][j].value,
                          },
                        ],
                      };
                      optionsData.push(data);
                    }

                    this.items.push({
                      selectType: res[i].type,
                      value: res[i].label,
                      label: res[i].label,
                      optionElement: optionsData,
                    });
                  }
                }
              } else if (res[i].type == 'input') {
                this.items.push({
                  inputType: res[i].type,
                  label: res[i].label,
                  value: '',
                });
              } else if (res[i].type == 'checkbox') {
                this.items.push({
                  checkType: res[i].type,
                  label: res[i].label,
                  value: false,
                });
              } else if (res[i].type == 'radio') {
                this.items.push({
                  radioType: res[i].type,
                  label: res[i].label,
                  value: false,
                });
              } else if (res[i].type == 'textarea') {
                this.items.push({
                  textArea: res[i].type,
                  label: res[i].label,
                  value: '',
                });
              }
            }
          },
          (error: any) => {
            console.log('ErrorMessage: ', error);
          }
        );
    });
  }

  search(text: string) {
    this.items.optionElement = text
      ? (
          JSON.parse(
            JSON.stringify(this.items.optionElement)
          ) as Select2Option[]
        ).filter(
          (option) =>
            option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      : JSON.parse(JSON.stringify(this.items.optionElement));
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

  goToUploadImage() {
    this.router.navigate(['uploadimage-page']);
  }

  goToAddNewAd() {
    this.router.navigate(['add-new-advertisement']);
  }

  goToNextStep() {
    let itemVal: any = [];
    for (let i = 0; i < this.items.length; i++) {
      itemVal.push(this.items[i].value);
    }

    this.storage.get('catDetails').then((val) => {
      let adData = {
        cid: val.cid,
        uid: val.userid,
        formData: itemVal,
      };

      this.http
        .post('https://specbits.com/class2/fab/partialSave', adData)
        .subscribe((res: any) => {
          console.log('response Data:', res);
          let data = {
            aid: res[0].add_id,
            uid: res[1].user_id,
          };
          this.storage.set('adDetails', data);
          this.router.navigate(['uploadimage-page']);
        });
      console.log(adData);
    });
  }

  ngOnInit() {
    this.storage.get('catTitle').then((val) => {
      this.catTitle = val;
    });
  }
}
