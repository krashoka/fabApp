import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthImplementsGuard implements CanLoad {
  constructor(private router: Router, private storage: Storage) {
    this.storage.create();
  }

  canLoad() {
    return new Promise<boolean>(async (resolve, reject) => {
      let isAuthenticated = await this.storage.get('admin');
      // console.log('Authenticate:', isAuthenticated);

      if (isAuthenticated) {
        resolve(true);
      } else {
        this.router.navigate(['login']);
        resolve(false);
      }
    });
  }
}
