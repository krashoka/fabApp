import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-footer-tabs',
  templateUrl: './footer-tabs.page.html',
  styleUrls: ['./footer-tabs.page.scss'],
})
export class FooterTabsPage implements OnInit {
  username: any;
  isLoggedIn = false;

  constructor(private router: Router, private storage: Storage) {
    this.storage.create();
  }

  ngOnInit() {
    this.storage.get('admin').then(
      (val) => {
        if (val.loggedin) {
          this.username = val.username;
          this.isLoggedIn = val.loggedin;
        }
      },
      (er) => {
        console.log(er);
      }
    );
  }

  more = false;

  showMore() {
    if (this.isLoggedIn) this.more = true;
    else this.router.navigate(['login']);
  }

  closeMore() {
    this.more = false;
  }

  logout() {
    this.storage.remove('admin');

    this.storage.get('admin').then((value) => {
      if (value == null) {
        this.router.navigate(['login']);
        this.more = false;
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
