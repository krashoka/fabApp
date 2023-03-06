import { Component} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // showCommercial= false;
  // showHomeContent = true;

  imageUrl: any = [];
  commercialImageUrl: string[] = [];
  
  categories: any = [];

  constructor(private router: Router, public http: HttpClient, private storage: Storage) { 
    this.storage.create();

    this.http.get("http://localhost/fabapp/backend/crouselImg.php").subscribe((res: any) => {
        
      console.log("Data fetched successfully: ",res);
      for(let i=0; i<res.length; i++){
        let data = {
          cr_id: res[i].cr_id,
          cr_img: 'http://localhost/fabapp/crouselimg/'+ res[i].cr_img
        }
        this.imageUrl.push(data);
      }

      console.log(this.imageUrl);
    },(error:any) => {
      console.log("ErrorMessage: ", error)
    });


    // **************** For Commercial tab image *****************
    this.http.get("http://localhost/fabapp/backend/commerceImg.php").subscribe((res: any) => {
        
      this.commercialImageUrl = res.map(imageName => 'http://localhost/fabapp/crouselimg/' + imageName);

    },(error:any) => {
      console.log("ErrorMessage: ", error)
    });


    // **************** For Categories Icons Section *****************
    this.http.get("https://specbits.com/class2/fab/index").subscribe((res: any) => {

      this.categories = res;

      console.log(res);

    },(error:any) => {
      console.log("ErrorMessage: ", error)
    });
  }

   

  topCrousel(data){

    console.log(data);

    this.http.get("http://localhost/fabapp/backend/crouselImg.php", data).subscribe((res: any) => {
      let newData = {cid: data};

      // this._apiService.sendCategory(data).subscribe((res:any)=>{
      //   console.log("check empty: ",res);
      //   if(res == 'empty'){
      //     this.router.navigate(['item-info']);
      //   }else{
          // let value = {
          //   newData: datas,
          //   title: titles
          // }
          this.storage.set('homeCrousel', newData);
          this.router.navigate(['commercialads']);
      //   } 
      // });
    });
  }

  onCommercialSelect = false;
  onHomeSelect = true;
  homeNotSelect = false;
  commercialTabComponent = false;
  homeTabComponent = false;

  onButtonClick(){
    this.commercialTabComponent = true;
  }

  onCommercialClick(){
    this.onCommercialSelect = true;
    this.onHomeSelect = false;
    this.homeNotSelect = true;
    this.homeTabComponent = true;
    this.commercialTabComponent = false;
  }

  onHomeClick(){
    this.onCommercialSelect = false;
    this.onHomeSelect = true;
    this.homeNotSelect = false;
    this.commercialTabComponent = true;
    this.homeTabComponent = false;
  }


  option = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 2,
    autoplay:true,
  }

  option2 = {
    slidesPerView: 4,
    // centeredSlides: true,
    loop: true,
    spaceBetween: 40,
    autoplay:true,
  }

  option3 = {
    slidesPerView: 2,
    // centeredSlides: true,
    loop: true,
    spaceBetween: 2,
    autoplay:true,
  }

  goToStickyAds() { 
    this.router.navigate(['products']);
   
  } 

  goToAddNewAd(){
    this.storage.get('admin.userid').then((value) => {
      if(value != null) this.router.navigate(['add-new-advertisement']);
      else this.router.navigate(['login']);
    }); 
  }

  goToCommercialAds() {  
    this.router.navigate(['commercialads']);  
  } 
}
