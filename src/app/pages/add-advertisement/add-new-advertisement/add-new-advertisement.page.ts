import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DataService } from 'src/app/data.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

import { SharedService } from 'src/app/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-advertisement',
  templateUrl: './add-new-advertisement.page.html',
  styleUrls: ['./add-new-advertisement.page.scss'],
})
export class AddNewAdvertisementPage implements OnInit {
  public buttonClickSubscription: Subscription;

  categories: any = [];
  english = true;
  arabic = false;

  constructor(
    private router: Router,
    public http: HttpClient,
    private navController: NavController,
    public _apiService: ApiService,
    private dataService: DataService,
    private storage: Storage,
    private sharedService: SharedService
  ) {
    this.storage.create();

    // **************** For Categories Icons Section *****************
    this.http.get('https://specbits.com/class2/fab/index').subscribe(
      (res: any) => {
        this.categories = res;
      },
      (error: any) => {
        console.log('ErrorMessage: ', error);
      }
    );

    this.buttonClickSubscription = this.sharedService.buttonClicked.subscribe(() => {
      // Update the UI here
      this.storage.get('changeLang').then((val) => {
        if (val) {
          if (val.lang === 'ar') {
            this.english = true;
            this.arabic = false;
          } else if (val.lang === 'en') {
            this.arabic = true;
            this.english = false;
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    
    });
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

  goToCategories(datas: any, titles: any, slug: any) {
    let data = { cid: datas };

    this.storage.set('catTitle', slug);

    this._apiService.sendCategory(data).subscribe((res: any) => {
      if (res == 'empty') {
        this.router.navigate(['item-info']);
      } else {
        let value = {
          newData: datas,
          slug: slug,
        };
        this.storage.set('category', value);
        this.router.navigateByUrl(`categories/${datas}`);
      }
    });
  }

  goToAddNewAd() {
    this.router.navigate(['add-new-advertisement']);
  }

  ngOnInit() {}
}
