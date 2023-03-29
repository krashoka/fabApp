import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {
  mobNumber: any;
  username: any;

  selectedSegment: any;

  segmentChanged(event) {
    this.selectedSegment = event.detail.value;
    console.log('SelectedSegment:', this.selectedSegment);
    // this.router.navigateByUrl(`/myaccount/${this.selectedSegment}`);
  }

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private route: ActivatedRoute
  ) {
    this.storage.create();

    this.storage.get('admin').then((val) => {
      console.log(val);
      let mobile = '+' + val.phonecode + ' ' + val.usermob;
      this.mobNumber = mobile;

      this.username = val.username;
    });
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  goBack() {
    this.navCtrl.back();
  }

  goToMyPoints(){
    this.router.navigate(['my-points']);
  }

  ngOnInit() {
    this.selectedSegment = this.route.snapshot.paramMap.get('slug');
    console.log('Segment VAl:', this.selectedSegment);
    if (this.selectedSegment == null) this.selectedSegment = 'ads';
  }
}
