import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  user_mob: any;
  countryCode: any = "973";

  vcode: any;

  user_pwd1: any;
  user_pwd2: any;

  isVerify = false;
  showSendVerify = true;
  isInputDisabled = false;
  showResetPassword = false;

  constructor(
    private router: Router, 
    public _apiService:ApiService,
    private toastCtrl: ToastController) { }
  
    resetPasswordValidation(){

      let data = {
        user_mob: this.user_mob,
        countryCode: this.countryCode
      }

      this._apiService.resetPasswordValidation(data).subscribe((res:any)=>{
        console.log("SuccessMessage: ", res);
        if(res == 'mnf'){
          this.errorToast("Number not registered!");
        }else{
          this.user_mob= res[0];
          this.isInputDisabled = true;
          this.successToast(res[1]);
          this.showSendVerify = false;
          this.isVerify= true;
        }
      },(er:any) => {
        console.log("ErrorMessage: ", er)
        if(er.error.message == "The user mob field is required."){
          this.errorToast("Mobile number is required!");
        }else if(er.error.message == 'mnf'){
          this.errorToast("Number not registered!");
        }else{
          this.errorToast("Invalid Number!");
        }
      })
      
  }

  verifyCode(){
      let data = {
        user_mob: this.user_mob,
        countryCode: this.countryCode,
        vcode: this.vcode
      }

      this._apiService.verifyCode(data).subscribe((res:any)=>{
        console.log(res);
        // this.user_mob= res;
        // this.isInputDisabled = true;
        if(res == "success"){
          this.successToast("Account Verified.");
          this.vcode=""
          this.showSendVerify = false;
          this.isVerify= false;
          this.isInputDisabled = true;
          this.showResetPassword = true;
        }else this.errorToast(res);
      },(er:any) => {
        console.log(er.error.message);
        if(er.error.message == "The vcode field is required."){
          this.errorToast(er.error.message = "Please enter OTP");
        }else{
          this.errorToast(er.error.message = "OTP must be a number");
        }
      })
  }

  resetPassword(){
    let data = {
      user_mob: this.user_mob,
      countryCode: this.countryCode,
      user_pwd1: this.user_pwd1,
      user_pwd2: this.user_pwd2
    }

    this._apiService.resetPassword(data).subscribe((res:any)=>{
      console.log(res);
      if(res == "success"){
        this.successToast("Password Updated.");
        this.user_mob="";
        this.countryCode="973";
        this.isInputDisabled = false;
        this.showResetPassword = false;
        this.router.navigate(['login']);
      }else this.errorToast("User not found!");
    },(er:any) => {
      console.log(er);
      if(er.error.errors.user_pwd1){
        if(er.error.errors.user_pwd1 == 'The user pwd1 field must be between 8 and 16 characters.'){
          this.errorToast("Password must be between 8 and 16 characters.")
        }else this.errorToast("Password is required!");
      }else if(er.error.errors.user_pwd2){
        this.errorToast("Confirm password didn't match!");
      }else{
        this.errorToast("Something went wrong!");
      }
    })
}

  async errorToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position:'top',
      cssClass: 'errorToast'
    });
    toast.present();
  }

  async successToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position:'top',
      cssClass: 'successToast'
    });
    toast.present();
  }

  goToHome() {  
    this.router.navigate(['home']);  
  } 

  ngOnInit() {
  }

}
