import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-system-navbar',
  templateUrl: './auth-system-navbar.page.html',
  styleUrls: ['./auth-system-navbar.page.scss'],
})
export class AuthSystemNavbarPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
