import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';
import { TranslateService } from '@ngx-translate/core';

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
  direction: any;

  constructor(
    private _apiService: ApiService,
    public translateService: TranslateService
  ) {
    // this._apiService.direction$.subscribe((value) => {
    //   this.direction = value;
    // });
  }

  translate(event: any) {
    this.translateService.use(event.target.value);
  }
}
