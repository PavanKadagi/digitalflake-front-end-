import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../services/shared.service';
import {environment} from 'src/environments/environment'
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {
   @Input() id!:any;
  @Output() close = new EventEmitter<void>(); 
  _id:any;
  serverURL = environment.devServer_url;

  constructor(private router:Router,private sharedService:SharedService,private apiService:ApiserviceService){}



  ngOnInit(){
    this.sharedService.id.subscribe((res:any)=>{
      console.log(res,"0000")
this._id = res['id'];
debugger
    })
  }

  onCancle(){

  }
  onClose(){
    this.close.emit();
  }





  onDelete(){
    let _id = this.sharedService.getId()
    let localURL = `delete-category/${_id}`;
    this.sharedService.loading.emit(true);
    let url =  this.serverURL+localURL;
    debugger
    this.apiService.deleteData(url).subscribe(res=>{
    this.sharedService.loading.emit(false);
      if(res['error']){
        alert(`${res['error']}`);
      }
      if(res['message']){
      document.location.reload();
        alert(`${res['message']}`);
      }
      
  })
   }
}
