import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage-angular';
// import 'select2';
// import '../../../assets/select2.css';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.page.html',
  styleUrls: ['./item-info.page.scss'],
})
export class ItemInfoPage implements OnInit {

  items: any = [];
  catTitle: any;

  constructor(private router: Router, private navCtrl: NavController, public http: HttpClient, private storage: Storage) {

    this.storage.create();

    this.storage.get('catDetails').then((val)=>{

      let newValue = {
        cid: val.cid
      }
    
    this.http.post("https://specbits.com/class2/fab/newform", newValue).subscribe((res: any) => {

    console.log(res)

      const indices = res.reduce((acc, cur, index) => {
        if(Array.isArray(cur)){
          acc.push(index);
        }
        return acc;
      }, []);

      for(let i=0; i<res.length; i++){
        if(res[i].type == "select"){

          for(let m=0; m<indices.length; m++){
            let options: any = [];
            
            // console.log("main index:",res[i].form_field_id, "index:",res[indices[m]][0].form_fields_id);
            // console.log()

            if(res[i].form_field_id == res[indices[m]][0].form_fields_id){
              for(let j=0; j<res[indices[m]].length; j++){
                options.push(res[indices[m]][j].value);
              }

              // this.items.push(
              //   '<p style="font-size:18px; font-weight:700">'+res[i].label+'</p><select style="width:100%;border: 1px solid #d9d9d9; font-size: 16px; padding:0 5px; height: 40px; font-weight: normal; margin-bottom: 20px; border-radius: 5px" '+res[i].label+'><option>Select</option>'+options+'</select>')
              // break;

              this.items.push({selectType: res[i].type, value: res[i].label, label: res[i].label, optionElement: options})
            }
          }
          
          
        }else if(res[i].type == "input"){
          // this.items.push(
          // '<p style="font-size:18px; font-weight:700">'+res[i].label+'</p><ion-input type="'+ res[i].type+'"  placeholder="'+res[i].label+'" style="width:100%;border: 1px solid #d9d9d9; font-size: 16px; font-weight: normal; margin-bottom: 20px; border-radius: 5px"/>')

          this.items.push({inputType: res[i].type, label: res[i].label, value:""})
        }else if(res[i].type == "checkbox"){
          // this.items.push(
          //   '<div style="display:flex; align-items:center; gap:10px; margin-bottom: 15px; font-weight:normal; font-size: 16px"><ion-checkbox slot="start"></ion-checkbox><ion-label>'+res[i].label+'</ion-label></div>'
          // )

          this.items.push({checkType: res[i].type, label: res[i].label, value: false})
        }
      }

    },(error:any) => {
      console.log("ErrorMessage: ", error)
    });
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

  goToNextStep(){
    let itemVal: any =[];
    for(let i=0; i<this.items.length; i++){
      itemVal.push(this.items[i].value);
    }

    this.storage.get('catDetails').then((val)=>{

      let adData = {
        cid: val.cid,
        uid: val.userid,
        formData: itemVal
      }

      this.http.post("https://specbits.com/class2/fab/partialSave", adData).subscribe((res:any) => {
        console.log("response Data:", res);
        let data= {
          aid: res[0].add_id,
          uid: res[1].user_id
        }
        this.storage.set("adDetails", data);
        this.router.navigate(['uploadimage-page']);
      })
      console.log(adData);
    });
  }

  ngOnInit() {
    this.storage.get('catTitle').then((val) => {
      this.catTitle = val;
    })
  }

}
