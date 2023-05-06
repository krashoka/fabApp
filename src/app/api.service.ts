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

  // Sending verification code to user
  sendVerify(data) {
    return this.http.post('https://specbits.com/class2/fab/register', data);
  }

  // Verifying code entered by user
  verifyCode(data) {
    return this.http.post('https://specbits.com/class2/fab/verify', data);
  }

  // Sending user data to complete user profile, like Name and Password
  completeProfile(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/complete-profile',
      data
    );
  }

  // Logging in user with the provided credentials
  loginUser(data) {
    return this.http.post('https://specbits.com/class2/fab/login', data);
  }

  // Sending verification code to reset password after authentication user
  resetPasswordValidation(data) {
    return this.http.post('https://specbits.com/class2/fab/reset', data);
  }

  // Reseting password with the new password provided by user.
  resetPassword(data) {
    return this.http.post('https://specbits.com/class2/fab/setpassword', data);
  }

  // Signing Out User
  logout(data) {
    return this.http.post('https://specbits.com/class2/fab/logout', data);
  }

  // Getting sub-category from Below Api
  sendCategory(data) {
    return this.http.post('https://specbits.com/class2/fab/subcategory', data);
  }

  // Getting form fields from Below API
  newForm(data) {
    return this.http.post('https://specbits.com/class2/fab/newform', data);
  }

  // Saving attributes of the Ad
  saveItemData(data) {
    return this.http.post('https://specbits.com/class2/fab/partialSave', data);
  }

  fetchAds(data) {
    return this.http.post('https://specbits.com/class2/fab/fetch-ads', data);
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

  fetchAdminData(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/active-user-info',
      data
    );
  }

  getAdTimer(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/get-adview-timer',
      data
    );
  }

  adViewPoint(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/update-adview-point',
      data
    );
  }

  fetchUserPoints(data) {
    return this.http.post(
      'https://specbits.com/class2/fab/fetch-user-points-history',
      data
    );
  }
}
