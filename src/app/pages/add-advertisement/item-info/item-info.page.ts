import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import * as $ from 'jquery';
// import 'select2';
// import '../../../assets/select2.css';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.page.html',
  styleUrls: ['./item-info.page.scss'],
})
export class ItemInfoPage implements OnInit {

  items: any = [];

  constructor(private router: Router, private navCtrl: NavController, public http: HttpClient) { 
    this.http.get("https://specbits.com/class2/fab/newform").subscribe((res: any) => {

    // for(let i=0; i<res.length; i++){
    //   let index = res.findIndex(array=> Array.isArray(array));

    // }
    console.log(res)

      const indices = res.reduce((acc, cur, index) => {
        if(Array.isArray(cur)){
          acc.push(index);
        }
        return acc;
      }, []);

      console.log(indices)

      for(let i=0; i<res.length; i++){
        if(res[i].type == "select"){

          console.log(i);

          for(let m=0; m<indices.length; m++){
            let options: any = [];
            
            // console.log("main index:",res[i].form_field_id, "index:",res[indices[m]][0].form_fields_id);
            // console.log()

            if(res[i].form_field_id == res[indices[m]][0].form_fields_id){
              for(let j=0; j<res[indices[m]].length; j++){
                options.push('<option>'+res[indices[m]][j].value+'</option>');
              }

              this.items.push(
                '<p style="font-size:18px; font-weight:700">'+res[i].label+'</p><select style="width:100%;border: 1px solid #d9d9d9; font-size: 16px; padding:0 5px; height: 40px; font-weight: normal; margin-bottom: 20px; border-radius: 5px" '+res[i].label+'><option>Select</option>'+options+'</select>')
              // break;
            }
          }
          
          
        }else if(res[i].type == "input"){
          this.items.push(
          '<p style="font-size:18px; font-weight:700">'+res[i].label+'</p><ion-input type="'+ res[i].type+'"  placeholder="'+res[i].label+'" style="width:100%;border: 1px solid #d9d9d9; font-size: 16px; font-weight: normal; margin-bottom: 20px; border-radius: 5px"/>')
        }else if(res[i].type == "checkbox"){
          this.items.push(
            '<div style="display:flex; align-items:center; gap:10px; margin-bottom: 15px; font-weight:normal; font-size: 16px"><ion-checkbox slot="start"></ion-checkbox><ion-label>'+res[i].label+'</ion-label></div>'
          )
        }
      }

      console.log(res);

    },(error:any) => {
      console.log("ErrorMessage: ", error)
    });
  }

  goToCommercialAds() {  
    this.router.navigate(['commercialads']);  
  }  

  goToStickyAds() {  
    this.router.navigate(['products']);  
  } 

  goToHome() {  
    this.router.navigate(['home']);  
  } 

  goBack() {
    this.navCtrl.back();
  }

  goToUploadImage(){
    this.router.navigate(['uploadimage-page']);  
  }

  goToAddNewAd(){
    this.router.navigate(['add-new-advertisement']);  
  }

  

  ngOnInit() {
    // $(document).ready(() => {
    //   $('#mySelect').select2({
    //     placeholder: 'Select an option',
    //     data: this.data.map((option) => ({ id: option.id, text: option.text }))
    //   });
    // });
    
    // $(document).ready(() => {
    //   $('#mySelect').select2({
    //     placeholder: 'Select an option',
    //     minimumInputLength: 2,
    //     ajax: {
    //       url: 'http://example.com/data',
    //       dataType: 'json',
    //       processResults: (data) => {
    //         return {
    //           results: data.items.map((item) => {
    //             return { id: item.id, text: item.name };
    //           })
    //         };
    //       }
    //     }
    //   });
    // });
  }

}
