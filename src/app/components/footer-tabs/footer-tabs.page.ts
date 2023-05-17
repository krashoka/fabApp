import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-footer-tabs',
  templateUrl: './footer-tabs.page.html',
  styleUrls: ['./footer-tabs.page.scss'],
})
export class FooterTabsPage {
  username: any;
  isLoggedIn = false;
  engFlag = false;
  arabicFlag = true;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private translateService: TranslateService,
    private storage: Storage
  ) {
    this.storage.create();
    this.storage.get('changeLang').then((lang) => {
      if (lang) {
        this.translateService.use(lang.lang); // set stored language
        // toggle language buttons based on the stored language
        this.engFlag = lang.lang !== 'en';
        this.arabicFlag = lang.lang !== 'ar';
      }
    });
  }

  translate(event) {
    this.translateService.use(event);
    if (event === 'ar') {
      this.engFlag = true;
      this.arabicFlag = false;
    } else if (event === 'en') {
      this.engFlag = false;
      this.arabicFlag = true;
    }
    let lang = { lang: event };
    this.storage
      .set('changeLang', lang)
      .then(() => {
        console.log('Value set successfully.');
      })
      .catch((error) => {
        console.error('Error setting value:', error);
      });

    this.sharedService.buttonClicked.emit();
  }

  ionViewWillEnter() {}

  showLogout = false;

  showMore() {
    this.storage.get('admin').then(
      (val) => {
        console.log('val:', val);
        if (val != null) {
          this.username = val.username;
          this.showLogout = true;
        } else this.router.navigate(['login']);
      },
      (er) => {
        console.log(er);
      }
    );
  }

  closeMore() {
    this.showLogout = false;
  }

  logout() {
    this.storage.remove('admin');

    this.storage.get('admin').then((value) => {
      if (value == null) {
        this.router.navigate(['login']);
        this.showLogout = false;
      }
    });
  }

  goToAddNewAd() {
    this.router.navigate(['add-new-advertisement']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToMyAccount() {
    this.router.navigate(['myaccount']);
  }

  goToChats() {
    // this.onHome = false;
    // this.onAccountSelect = false;
    // this.onChatSelect = true;
  }

  isElementActive(routePath: string): boolean {
    return this.router.url.includes(routePath);
  }
}
