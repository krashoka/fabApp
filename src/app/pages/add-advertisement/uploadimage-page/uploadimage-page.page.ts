import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { WebView } from '@ionic-native/ionic-webview/ngx';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import {
  Directory,
  Filesystem,
  FilesystemDirectory,
} from '@capacitor/filesystem';
import axios from 'axios';

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';

const IMAGE_DIR = 'stored-images';

interface Localfile {
  name: string;
  path: string;
  data: string;
}

const VIDEO_DIR = 'stored-video';

@Component({
  selector: 'app-uploadimage-page',
  templateUrl: './uploadimage-page.page.html',
  styleUrls: ['./uploadimage-page.page.scss'],
})
export class UploadimagePagePage implements OnInit {
  images: Localfile[] = [];

  videoUrl: any;
  video: any;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private webview: WebView,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform,
    private loadingCtrl: LoadingController
  ) {
    this.storage.create();
  }

  async loadVideos() {
    const videoData = await this.storage.get('videos');
    this.video = JSON.parse(videoData.value);
    return this.video;
  }

  async uploadVideo() {
    const fileUrl = this.videoUrl;
    console.log('FileUrl issss:', fileUrl);
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const base64Data = (await this.convertBlobToBase64(blob)) as string;
    const fileName = new Date().getTime() + '.mp4';

    const savedFile = await Filesystem.writeFile({
      path: `${VIDEO_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
    });

    this.video = savedFile.uri;
    console.log('my Video: ', this.video);

    return this.storage.set('videos', JSON.stringify(this.video));
  }

  // async uploadVideo() {
  //   const videoFileName = this.videoUrl;
  //   console.log('Video Name:', videoFileName);

  //   await Filesystem.writeFile({
  //     path: `${VIDEO_DIR}/${videoFileName}`,
  //     directory: Directory.data,
  //   });

  //   const videoFile = await Filesystem.readFile({
  //     path: `${VIDEO_DIR}/${videoFileName}`,
  //     directory: Directory.External,
  //   });
  //   console.log(`data:video/mp4;base64,${videoFile.data}`);
  // }

  // BELOW CODE FOR IMAGE SELECTION ON BUTTON CLICK ************
  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    console.log(image);

    if (image) {
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo) {
    const base64 = await this.readAsBase64(photo);
    console.log(base64);
    if (base64 !== undefined) {
      const fileName = new Date().getTime() + '.jpeg';
      const savedFile = await Filesystem.writeFile({
        directory: Directory.Data,
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64,
      });
      console.log('saved', savedFile);
      this.loadFiles();
    }
  }

  async readAsBase64(photo: Photo): Promise<string | undefined> {
    if (!photo) {
      return undefined;
    }
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid') && photo.path) {
      // Read the file into base64 format
      // if (photo.path !== undefined) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
      // }
    } else if (photo.webPath) {
      // Fetch the photo, read as a blob, then convert to base64 format
      // if (photo.webPath !== undefined) {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
      // }
    }

    return undefined;
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async successToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',
      cssClass: 'successToast',
    });
    toast.present();
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

  goToAdInfo() {
    this.router.navigate(['ad-info']);
  }

  goToAddNewAd() {
    this.router.navigate(['add-new-advertisement']);
  }

  ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
    this.images = [];

    // const loading = await this.loadingCtrl.create({
    //   message: 'Loading data...',
    // });

    // await loading.present();

    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR,
    }).then(
      (result) => {
        console.log('result:', result);
        this.loadFileData(result.files);
      },
      async (err) => {
        await Filesystem.mkdir({
          directory: Directory.Data,
          path: IMAGE_DIR,
        });
      }
    );
    // .then((_) => {
    //   loading.dismiss();
    // });
  }

  async loadFileData(fileNames: any[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f.name}`;

      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath,
      });

      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });

      console.log('Read: ', readFile);
    }
  }

  // async startUpload(file: any) {
  //   console.log('newFile:', file);
  //   console.log('imageName:', file.name);
  //   const response = await fetch(file.data);
  //   console.log('Resppppp:', response);
  //   const blob = await response.blob();
  //   console.log('blobData: ', blob);

  //   const formData: FormData = new FormData();
  //   formData.append('file', blob, file.name.name);
  //   setTimeout(() => {
  //     this.uploadData(formData);
  //   }, 1000);
  // }

  async startUpload() {
    let files: any = this.images;
    // let blobs: Blob[] = [];
    console.log('FilesName:', this.images);
    for (let i = 0; i < files.length; i++) {
      const response = await fetch(files[i].data);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('file', blob, files[i].name.name);

      this.uploadData(formData);
      // console.log('Uolols:', upData.__zone_symbol__state);
      // // blobs.push(blob);
      // upData.then((state) => {
      //   console.log('Uolols:', state);
      // });
    }

    // let delFile = this.images;

    for (let i = 0; i < this.images.length; i++) {
      await Filesystem.deleteFile({
        directory: Directory.Data,
        path: this.images[i].path,
      });
    }

    // const mergedBlob = new Blob(blobs, { type: blobs[0].type });

    // console.log('mergedBlobs:', mergedBlob);

    // const formData = new FormData();
    // formData.append('file', mergedBlob);

    // this.uploadData(formData);
  }

  async uploadData(formData: FormData) {
    console.log('FormDataaaaa: ', formData);

    // const loading = await this.loadingCtrl.create({
    //   message: 'Loading data...',
    // });

    // await loading.present();

    const url = 'https://specbits.com/class2/fab/storeImg';

    try {
      const uploadResponse = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload response:', uploadResponse);
      this.successToast('Images UP');
    } catch (error) {
      console.error('Upload error:', error);
    }

    const url2 = 'https://specbits.com/class2/fab/aiduid';

    this.storage.get('adDetails').then((val) => {
      let data = {
        aid: val.aid,
        uid: val.uid,
      };

      // let simage = formData;
      this.http.post(url2, data).subscribe(
        (res) => {
          console.log('Image Upload response: ', res);
        },
        (error) => {
          console.log('Something went wrong in uploading image:', error);
        }
      );
    });
  }

  async deleteImage(file: Localfile) {
    console.log(file);
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });

    this.loadFiles();
  }

  async errorToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',
      cssClass: 'errorToast',
    });
    toast.present();
  }
}

function finalize(
  arg0: () => void
): import('rxjs').OperatorFunction<Object, unknown> {
  throw new Error('Function not implemented.');
}
