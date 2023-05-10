import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

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

  goToHome(){
    
  }

}
