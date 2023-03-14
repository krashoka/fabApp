import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: any;

  newName: any;
  currentPassword: any;
  newPassword: any;
  confirmPassword: any;

  constructor(private router: Router, private storage: Storage) {
    this.storage.create();

    this.storage.get('admin').then((val) => {
      console.log(val);
      this.username = val.username;
    });
  }

  goToMyAccount() {
    this.router.navigate(['myaccount']);
  }

  emptyName() {
    this.newName = '';
  }

  emptyPassword() {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  ngOnInit() {}
}
