import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  sendVerify(data){
    console.log("Verification code received :)")
    return this.http.post("https://specbits.com/class2/fab/register", data);
  }

  verifyCode(data){
    console.log("data added :)")
    return this.http.post("https://specbits.com/class2/fab/verify", data);
  }

  loginUser(data){
    console.log("login data send :)")
    return this.http.post("https://specbits.com/class2/fab/login", data);
  }

  resetPasswordValidation(data){
    console.log("Verification code received :)")
    return this.http.post("https://specbits.com/class2/fab/reset", data);
  }

  resetPassword(data){
    console.log("reseting successful :)")
    return this.http.post("https://specbits.com/class2/fab/setpassword", data);
  }

  logout(data){
    console.log("reseting successful :)")
    return this.http.post("https://specbits.com/class2/fab/logout", data);
  }

  sendCategory(data){
    return this.http.post("https://specbits.com/class2/fab/subcategory", data);
  }
}


