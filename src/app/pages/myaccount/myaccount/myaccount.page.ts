import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {
  mobNumber: any;
  username: any;

  selectedSegment: any = 'ads';

  segmentChanged(event) {
    this.selectedSegment = event.detail.value;
  }

  constructor(private router: Router, private storage: Storage) {
    this.storage.create();

    this.storage.get('admin').then((val) => {
      console.log(val);
      let mobile = '+' + val.phonecode + ' ' + val.usermob;
      this.mobNumber = mobile;

      this.username = val.username;
    });
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  ngOnInit() {}
}
