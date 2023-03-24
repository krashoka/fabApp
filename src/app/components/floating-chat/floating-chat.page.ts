import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-floating-chat',
  templateUrl: './floating-chat.page.html',
  styleUrls: ['./floating-chat.page.scss'],
})
export class FloatingChatPage implements OnInit {
  constructor(private router: Router, private storage: Storage) {
    this.storage.create();
  }

  ngOnInit() {}

  onDropdownSelect = false;
  openFloatingChat() {
    this.storage.get('admin').then((value) => {
      if (value != null) this.onDropdownSelect = !this.onDropdownSelect;
      else this.router.navigate(['login']);
    });
  }

  dismissSideMenu() {
    this.onDropdownSelect = !this.onDropdownSelect;
  }
}
