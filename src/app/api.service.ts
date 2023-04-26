import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private directionSubject = new BehaviorSubject<string>('ltr');
  public direction$ = this.directionSubject.asObservable();

  constructor(public http: HttpClient) {}

  setDirection(direction: string) {
    this.directionSubject.next(direction);
  }

  sendVerify(data) {
    console.log('Verification code received :)');
    return this.http.post('https://specbits.com/class2/fab/register', data);
  }

  verifyCode(data) {
    console.log('data added :)');
    return this.http.post('https://specbits.com/class2/fab/verify', data);
  }

  loginUser(data) {
    console.log('login data send :)');
    return this.http.post('https://specbits.com/class2/fab/login', data);
  }

  resetPasswordValidation(data) {
    console.log('Verification code received :)');
    return this.http.post('https://specbits.com/class2/fab/reset', data);
  }

  resetPassword(data) {
    console.log('reseting successful :)');
    return this.http.post('https://specbits.com/class2/fab/setpassword', data);
  }

  logout(data) {
    console.log('reseting successful :)');
    return this.http.post('https://specbits.com/class2/fab/logout', data);
  }

  sendCategory(data) {
    return this.http.post('https://specbits.com/class2/fab/subcategory', data);
  }

  fetchAds(data) {
    return this.http.post('https://specbits.com/class2/fab/fetch-ads', data);
  }

  completeProfile(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/complete-profile',
      data
    );
  }

  getChats(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/admin/load-message',
      data
    );
  }

  openChat(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/admin/change-seen-flag',
      data
    );
  }

  sendChat(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/admin/send-message',
      data
    );
  }

  showUserChat(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/fetch-comment',
      data
    );
  }

  changeName(data) {
    return this.http.post('https://specbits.com/class2/fab/update-name', data);
  }

  changePassword(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/update-password',
      data
    );
  }

  addToFavorites(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/add-to-favorites',
      data
    );
  }

  removeFromFavorites(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/remove-from-favorites',
      data
    );
  }

  fetchFavorites(favData) {
    return this.http.post('https://specbits.com/class2/fab/favorites', favData);
  }

  fetchLoggedAds(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/fetch-logged-ads',
      data
    );
  }
}
