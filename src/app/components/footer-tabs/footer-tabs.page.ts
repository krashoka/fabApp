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

  constructor(private router: Router, private storage: Storage) {
    this.storage.create();

    this.storage.get('admin').then((val) => {
      this.username = val.username;
    });
  }

  // onHome = false;
  // onAccountSelect = false;
  // onChatSelect = false;

  ngOnInit() {}

  more = false;

  showMore() {
    this.more = true;
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
    // this.onHome = true;
    // this.onAccountSelect = false;
    // this.onChatSelect = false;
    this.router.navigate(['/']);
  }

  goToMyAccount() {
    // this.onHome = false;
    // this.onAccountSelect = true;
    // this.onChatSelect = false;
    this.router.navigate(['myaccount']);
  }

  goToChats() {
    // this.onHome = false;
    // this.onAccountSelect = false;
    // this.onChatSelect = true;
  }
}
