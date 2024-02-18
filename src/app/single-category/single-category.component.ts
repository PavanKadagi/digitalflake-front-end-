import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {environment} from 'src/environments/environment'
import { SharedService } from '../services/shared.service';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent {
  serverURL = environment.devServer_url;
  category:any;
  status:any
  categoryName:any;
  description:any
  _id:any;

  constructor(private http:HttpClient,private router:Router,private a:ActivatedRoute,private sharedService:SharedService,private apiService:ApiserviceService){}


  ngOnInit(){
    this.a.queryParams.subscribe((res:any)=>{
      this._id = res['_id']
    })
    this.getOneCategory()
  }


  getOneCategory(){
    let localURL = `get-one-category/${this._id}`;
    this.sharedService.loading.emit(true);
    let url =  this.serverURL+localURL;
    this.apiService.getData(url).subscribe(res=>{
    this.sharedService.loading.emit(false);
    this.category = res['data'];
    this.description = res['data']['description'];
    this.categoryName = res['data']['categoryName'];
    this.status = res['data']['status'];
    if(res['error']){
      alert(res['error']);
    }
  })

  }

  onCategory(category:any){
    if(category.form.valid){
    const {status,declaration,categoryName} = category.form.value;
    const data = {status,declaration,categoryName};
    let localURL = `edit-category/${this._id}`;
    this.sharedService.loading.emit(true);
    let url =  this.serverURL+localURL;
    this.apiService.patchData(url,data).subscribe(res=>{
    this.sharedService.loading.emit(false);
    if(res['error']){
      alert(res['error']);
    }
    if(res['message']){
      alert(res['message']);
      this.router.navigate(['/category'])
    }
  })
}
else{
  alert("please enter all filed")
}
  }


  onCancle(){
    this.router.navigate(['/category'])
  }
}
