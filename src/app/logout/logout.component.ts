import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private auth:AuthService,private route:Router,private s:SharedService){}

  onLogout(){
    this.auth.logout();
    this.s.show.emit(false);
    // this.loginOrNot = '';
    this.route.navigate(['/login']);
  }
}
