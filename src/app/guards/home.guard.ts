import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanLoad {
  constructor(private router: Router, private storage: Storage) {
    this.storage.create();
  }

  async canLoad() {
    const isAuthenticated = await this.storage.get('admin');

    if (isAuthenticated) {
      this.router.navigateByUrl('/home');
      return false;
    } else {
      return true;
    }
  }
}
