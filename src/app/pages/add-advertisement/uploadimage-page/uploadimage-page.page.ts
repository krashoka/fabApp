import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { File } from '@ionic-native/file/ngx';
// import { FileEntry } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-uploadimage-page',
  templateUrl: './uploadimage-page.page.html',
  styleUrls: ['./uploadimage-page.page.scss'],
})
export class UploadimagePagePage implements OnInit {
  imageSrc: any;

  constructor(private router: Router, private navCtrl: NavController) {}

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

  goToAdInfo() {
    this.router.navigate(['ad-info']);
  }

  goToAddNewAd() {
    this.router.navigate(['add-new-advertisement']);
  }

  ngOnInit() {
    // this.loadImage();
  }

  onFileSelected(event: any) {
    // const file: File = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     // let data;
    //     // if (e.target?.result?.toString != undefined) {
    //     //   data = e.target?.result?.toString;
    //     // }
    //     // let img = document.createElement('img');
    //     // img.src = encodeURIComponent(data);
    //     // // Append the <img> element to the DOM
    //     // let container = document.getElementById('container');
    //     // if (container) {
    //     //   // Add a null check here
    //     //   container.appendChild(img);
    //     // }
    //     // console.log(data);
    //     // // Do something with the file dataUrl
    //     let base64Data;
    //     if (e.target?.result?.toString != undefined) {
    //       base64Data = e.target?.result?.toString;
    //     }
    //     const chunkSize = 1024 * 1024; // 1MB chunks
    //     const chunks: any = [];
    //     for (let i = 0; i < base64Data.length; i += chunkSize) {
    //       chunks.push(base64Data.slice(i, i + chunkSize));
    //     }
    //     const img = document.createElement('img');
    //     img.onload = function () {
    //       const container = document.getElementById('container');
    //       if (container) container.appendChild(img);
    //     };
    //     function loadImageChunk(chunkIndex) {
    //       if (chunkIndex >= chunks.length) {
    //         return;
    //       }
    //       const xhr = new XMLHttpRequest();
    //       xhr.open('GET', `data:image/png;base64,${chunks[chunkIndex]}`);
    //       xhr.responseType = 'blob';
    //       xhr.onload = function () {
    //         if (xhr.status === 200) {
    //           const blobUrl = URL.createObjectURL(xhr.response);
    //           img.src = blobUrl;
    //           img.style.width = '100%';
    //           img.style.height = 'auto';
    //           loadImageChunk(chunkIndex + 1);
    //         }
    //       };
    //       xhr.send();
    //     }
    //     loadImageChunk(0);
    //   };
    //   reader.readAsDataURL(file);
    // }
  }

  // async loadImage() {
  //   const imageUri = 'file:///path/to/image.jpg';
  //   try {
  //     const fileEntry = await this.file.resolveLocalFilesystemUrl(imageUri);
  //     const file = await fileEntry.getFile();
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       this.imageSrc = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
