import { Component, ViewEncapsulation,OnInit, } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from './services/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation:ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'digitaflake';
  loading:boolean = false;
  loginOrNot:boolean = true;
  openAndClose:string='';

  constructor(private sharedService:SharedService,private a:ActivatedRoute,private route:Router) {}

  ngOnInit(){
  // this.loginOrNot = true;

    // if(this.route.url == 'login' ){
    //   this.loginOrNot = false
    // }else{
    //   this.loginOrNot = true
    // }
    this.openAndClose = this.sharedService.getShow();
    this.sharedService.loading.subscribe(res=>{
     this.loading = res;
    })
    this.sharedService.show.subscribe((res:any)=>{
      this.loginOrNot = res;
     })

    
    //  this.route.events
    //  .pipe(filter(event => event instanceof NavigationEnd))
    //  .subscribe((event:any) => {
    //    this.loginOrNot = event.url.includes('login');
    //  });

   console.log(this.a.url.subscribe((res)=>res),this.route,this.route.url,"loading")
 }
}
