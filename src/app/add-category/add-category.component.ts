import { Component } from '@angular/core';
  import {environment} from 'src/environments/environment'
  import { SharedService } from '../services/shared.service';
  import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  serverURL = environment.devServer_url;

  constructor(private router:Router,private sharedService:SharedService,private apiService:ApiserviceService){}


  AddCategory(category:any){
    if(category.form.valid){

    const {status,description,categoryName} = category.form.value;
    const data = {status,description,categoryName};
    let localURL = 'create-category';
    this.sharedService.loading.emit(true);
    let url =  this.serverURL+localURL;
    this.apiService.postData(url,data).subscribe(res=>{
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
  alert("Please enter all filed")
}
  }

  onCancle(){
    this.router.navigate(['/category'])
  }
}
