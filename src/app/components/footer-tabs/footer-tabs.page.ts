import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-footer-tabs',
  templateUrl: './footer-tabs.page.html',
  styleUrls: ['./footer-tabs.page.scss'],
})
export class FooterTabsPage implements OnInit {
  constructor(private router: Router, private storage: Storage) {}

  ngOnInit() {}

  goToAddNewAd() {
    this.storage.get('admin').then((value) => {
      if (value != null) this.router.navigate(['add-new-advertisement']);
      else this.router.navigate(['login']);
    });
  }
}
