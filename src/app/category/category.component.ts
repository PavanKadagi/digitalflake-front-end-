import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { SharedService } from '../services/shared.service';
import {environment} from 'src/environments/environment'
import {MatDialog} from '@angular/material/dialog';
import { ModelComponent } from '../model/model.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  serverURL = environment.devServer_url;
  category:any =[];
  modal:boolean = false;
  // id:any;


  constructor(private router: ActivatedRoute,private route : Router ,private apiService:ApiserviceService ,private sharedService:SharedService,public dialog: MatDialog){
  }

  ngOnInit(){
    this.getAllCategory();
  }

  openDialog(id:any) {
    const dialogRef = this.dialog.open(ModelComponent);
    this.sharedService.id.emit(id);
    this.sharedService.setId(id);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllCategory(){
    let localURL = 'get-all-category';
    this.sharedService.loading.emit(true);
    let url =  this.serverURL+localURL;
    this.apiService.getData(url).subscribe(res=>{
    this.sharedService.loading.emit(false);
      if(res['error']){
        alert(`${res['error']}`);
      }
        this.category = res['data'];
  })
 }

 onEdit(id:any){
  this.route.navigate(['/single-category'],{queryParams:{_id:id}})
 }

 addcategory(){
  this.route.navigate(['/add-category'])

 }

 onClose(){
  this.modal = false
}


}



