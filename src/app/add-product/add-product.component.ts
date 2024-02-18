import { Component } from '@angular/core';
  import {environment} from 'src/environments/environment'
  import { SharedService } from '../services/shared.service';
  import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  // category:any[] = ['Select'];
  categorys: string[] = [];
  serverURL = environment.devServer_url;
  selectedFiles:any;


  constructor(private router:Router,private sharedService:SharedService,private apiService:ApiserviceService){}
 
  ngOnInit(){
    // this.category = ['Select'];
    this.getCategory()
  }


  getCategory(){
    let localURL = 'get-all-category';
    this.sharedService.loading.emit(true);
    let url =  this.serverURL+localURL;
    this.apiService.getData(url,).subscribe(res=>{
    this.sharedService.loading.emit(false);
    console.log(res['data'])
    if(res['error']){
      alert(res['error'])
    }

      for(let item of res['data']){
        if(item['status'] == 'Active'){
          this.categorys.push(item['categoryName']);
        }
      }
    })
    debugger;
  }

  AddProduct(product:NgForm){
    const {productName,packSize,mrp,category,status} = product.form.value;
    const formData = new FormData();
    const fileInput: HTMLInputElement = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
        formData.set('image', fileInput.files[0]);
    }
    formData.set('productName', productName);
    formData.set('packSize', packSize);
    formData.set('mrp', mrp);
    formData.set('category', category);
    formData.set('status', status);

    let localURL = 'create-product';
    this.sharedService.loading.emit(true);
    let url =  this.serverURL+localURL;
    this.apiService.postData(url,formData).subscribe(res=>{
    this.sharedService.loading.emit(false);
    if(res['error']){
      alert(res['error'])
    }
     if(res['message']){
      alert(res['message']);
      this.router.navigate(['/product'])
    }
    })
  }
 

  onCancle(){
    this.router.navigate(['/product'])
  }

  selectFile(event:any) {
    this.selectedFiles = event.target.files;
}
}
