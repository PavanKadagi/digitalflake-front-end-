import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import {MatDialog} from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent {
  loginOrNot:boolean = false ;

  constructor(private auth:AuthService,private route:Router,private s:SharedService,public dialog: MatDialog){}

  ngOnInit(){
  //  this.loginOrNot = this.auth.getToken();
   this.s.show.subscribe((res:any)=>{
    this.loginOrNot = res;
   })

   console.log(this.route,"00000000000000000",this.route.url)
  }

  openDialog() {
    const dialogRef = this.dialog.open(LogoutComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

 

}
