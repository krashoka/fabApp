import { Injectable } from '@angular/core';
import { CanLoad, Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthImplementsGuard implements CanLoad{

  constructor(private router: Router, private storage: Storage) { this.storage.create();}

  canLoad(){
    let isAuthenticated = "";
    
    const getValue = async () =>{
      isAuthenticated = await this.storage.get('admin');
    }

    getValue();

    console.log("Correct Value is: ", isAuthenticated);
    

    console.log("Authentication value is: ", isAuthenticated);
    if(isAuthenticated != null){
      return true;
    }else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
