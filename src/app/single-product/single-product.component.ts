import { Component } from '@angular/core';
  import {environment} from 'src/environments/environment'
  import { SharedService } from '../services/shared.service';
  import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent {
  categorys: string[] = [];
  serverURL = environment.devServer_url;
  selectedFiles:any;
  _id:any;
  constructor(private router:Router,private sharedService:SharedService,private apiService:ApiserviceService,private a:ActivatedRoute){}
  product:any ={};
  image:any

  ngOnInit(){
    this.a.queryParams.subscribe((res:any)=>{
      this._id = res['_id']
    });
    this.getOneProduct();
    this.getCategory();
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

  getOneProduct(){
    let localURL = `get-one-product/${this._id}`;
    this.sharedService.loading.emit(true);
    let url =  this.serverURL+localURL;
    this.apiService.getData(url).subscribe(res=>{
    this.sharedService.loading.emit(false);
    this.product = res['data'];
    this.image = res['data']['image'];

    // for(let item of res['data']){
    //   this.categorys.push(item['category'])
    // }
    // this.description = res['data']['description'];
    // this.categoryName = res['data']['categoryName'];
    // this.status = res['data']['status'];
    if(res['error']){
      alert(res['error']);
    }
  })

  }
  
  onCancle(){
    this.router.navigate(['/product'])
  }



  UpdateProduct(product:any){
    const {productName,packSize,mrp,category,status} = product.form.value;
    const formData = new FormData();
    const fileInput: HTMLInputElement = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
        formData.set('image', fileInput.files[0]);
    }else{
      formData.set('image', this.image);
    }
    formData.set('productName', productName);
    formData.set('packSize', packSize);
    formData.set('mrp', mrp);
    formData.set('category', category);
    formData.set('status', status);
    console.log(formData);
    let localURL = `edit-product/${this._id}`;
    this.sharedService.loading.emit(true);
    let url =  this.serverURL+localURL;
    this.apiService.putData(url,formData).subscribe(res=>{
    this.sharedService.loading.emit(false);
    if(res['message']){
      alert(res['message'])
      this.router.navigate(['/product']);
    }
    if(res['error']){
      alert(res['error']);
    }
    });
  }

  selectFile(event:any) {
    this.selectedFiles = event.target.files;
}
}
