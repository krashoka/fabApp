import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // constructor(private router: Router, private cookieService: CookieService) {
  //   const loggedIn = this.cookieService.get('loggedIn');

  //   if (!loggedIn) {
  //     this.router.navigateByUrl('/login');
  //   }
  // }

  constructor(){}
}
