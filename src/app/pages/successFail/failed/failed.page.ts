import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.page.html',
  styleUrls: ['./failed.page.scss'],
})
export class FailedPage implements OnInit {

  time = 2;

  constructor(private router: Router) { }

  ngOnInit() {
    let counter = setInterval(()=>{
      this.time--;
      if(this.time == -1){
        clearInterval(counter);
        this.router.navigateByUrl('home');
      }
    },1000)
  }

}
