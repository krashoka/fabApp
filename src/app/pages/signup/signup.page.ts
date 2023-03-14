import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user_mob: any;
  phonecode = "973";
  countries: any = [];

  vcode: any;

  isVerify = false;
  showSendVerify = true;
  isInputDisabled = false;

  constructor(
    private router: Router, 
    public _apiService:ApiService,
    private toastCtrl: ToastController,
    private http: HttpClient) {

      this.http.get("https://specbits.com/class2/fab/country").subscribe((res:any) => {
        console.log(res);
        this.countries = res;
      });
    }
  
  sendVerify(){

      let data = {
        user_mob: this.user_mob,
        phonecode: this.phonecode
      }

      console.log(data)

      this._apiService.sendVerify(data).subscribe((res:any)=>{
        console.log("SuccessMessage: ", res);
        if(res=="exists"){
          this.errorToast("Number already registered!");
        }else {
          this.user_mob= res[1];
          this.isInputDisabled = true;
          this.successToast(res[1]);
          this.showSendVerify = false;
          this.isVerify= true;
        }
        
      },(er:any) => {
        console.log("ErrorMessage: ", er)
        if(er.error.message == "The user mob field is required."){
          this.errorToast("Mobile number is required!");
        }else{
          this.errorToast("Invalid Number!");
        }
      })
      
  }

  verifyCode(){
      let data = {
        user_mob: this.user_mob,
        phonecode: this.phonecode,
        vcode: this.vcode
      }

      this._apiService.verifyCode(data).subscribe((res:any)=>{
        console.log(res);
        // this.user_mob= res;
        // this.isInputDisabled = true;
        if(res == "success"){
          this.successToast("Account Verified.");
          this.user_mob="";
          this.phonecode="973";
          this.vcode=""
          this.showSendVerify = true;
          this.isVerify= false;
          this.isInputDisabled = false;
          this.router.navigate(['login']);
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

    // this.phonecode = "+973"
  }

}
