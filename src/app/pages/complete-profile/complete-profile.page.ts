import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
})
export class CompleteProfilePage implements OnInit {
  username: any;
  typePassword = 'password';
  typeConfirmPassword = 'password';
  password: any;
  confirmPassword: any;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor() {}

  emptyPassword() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.typePassword === 'password'
      ? (this.typePassword = 'text')
      : (this.typePassword = 'password');
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.typeConfirmPassword === 'password'
      ? (this.typeConfirmPassword = 'text')
      : (this.typeConfirmPassword = 'password');
  }

  ngOnInit() {}
}
