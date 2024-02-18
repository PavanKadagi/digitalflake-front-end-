import { Component, ElementRef, ViewChild } from '@angular/core';
import {environment} from 'src/environments/environment'

import { Data, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  @ViewChild('email') email?: ElementRef;
  @ViewChild('password') password?: ElementRef;
  serverURL = environment.devServer_url;
  hide = true;

  constructor(private authService: AuthService,private router:Router,private sharedService:SharedService) { }

  ngOnInit() {
    // this.sharedService.setShow('show');
    // this.sharedService.show.emit(false)
    localStorage.removeItem('token');
    localStorage.clear();
  }


  signIn() {
    const email = this.email?.nativeElement.value;
    const password = this.password?.nativeElement.value;

    if (!email || !password) {
      alert("Please Enter All fields...!")
    } else {
      let localURL = 'login';
      let url = this.serverURL + localURL;
      this.sharedService.loading.emit(true);
      const data = { email, password }
      this.authService.signIn(url, data)?.subscribe((res: any) => {
        this.sharedService.loading.emit(false);
        if(res['error']){
          alert(res['error']);
        }else{
          alert(res['message']);
          const {  token } = res;
          this.authService.setToken(token);
          this.sharedService.show.emit(true);
          this.sharedService.loading.emit(false);
            this.router.navigate(['/home']) 
        }
      }),
      (error:any)=>{console.log(error,"error")}
    }
  }

}
