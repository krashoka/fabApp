import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-auth-system-navbar',
  templateUrl: './auth-system-navbar.page.html',
  styleUrls: ['./auth-system-navbar.page.scss'],
})
export class AuthSystemNavbarPage implements OnInit {
  engFlag = false;
  arabicFlag = true;

  constructor(
    private router: Router,
    private storage: Storage,
    private translateService: TranslateService,
    private sharedService: SharedService
  ) {
    this.storage.create();

    this.storage.get('changeLang').then((lang) => {
      if (lang) {
        this.translateService.use(lang.lang); // set stored language
        // toggle language buttons based on the stored language
        this.engFlag = lang.lang !== 'en';
        this.arabicFlag = lang.lang !== 'ar';
      }
    })
    .catch((error) => {
      console.error('Error setting value:', error);
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

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
