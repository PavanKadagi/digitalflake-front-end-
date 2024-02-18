import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { SharedService } from '../services/shared.service';
import {environment} from 'src/environments/environment'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  serverURL = environment.devServer_url;
  product:any =[];
  image:string = `${this.serverURL}images/`;
  imagesURL:any = [];
  constructor(private router: ActivatedRoute,private route : Router ,private apiService:ApiserviceService ,private sharedService:SharedService){
  }

  ngOnInit(){
    this.getAllProduct();
  }

  getAllProduct(){
    let localURL = 'get-all-product';
    this.sharedService.loading.emit(true);
    let url =  this.serverURL+localURL;
    this.apiService.getData(url).subscribe(res=>{
    this.sharedService.loading.emit(false);
      if(res['error']){
        alert(`${res['error']}`);
      }
        this.product = res['data'];
        for(let item of res['data']){
          const img = this.image+item['image']
          item['image'] = img;
          this.imagesURL.push(img)
        }
        console.log(this.imagesURL,"000")
        debugger
        // this.image = res['data']['image']
  })
 }

  onEdit(id:any){
    this.route.navigate(['/single-product'],{queryParams:{_id:id}});
  }
  onDelete(id:any){
    let localURL = `delete-product/${id}`;
    this.sharedService.loading.emit(true);
    let url =  this.serverURL+localURL;
    this.apiService.deleteData(url).subscribe(res=>{
    this.sharedService.loading.emit(false);
      if(res['error']){
        alert(`${res['error']}`);
      }
      if(res['message']){
        alert(`${res['message']}`);
        this.getAllProduct();
      }
    });
  }

  addproduct(){
    console.log("aksjhdkasb")
    this.route.navigate(['/add-product'],{relativeTo:this.router})
  }
}
