import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import {LoginComponent} from './auth/login/login.component'
import { AddCategoryComponent } from './add-category/add-category.component';
import {ModelComponent} from './model/model.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleProductComponent } from './single-product/single-product.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDialog, MatDialogModule,MatDialogActions} from '@angular/material/dialog';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [
    AppComponent,
    LeftsidebarComponent,
    RegisterComponent,
    HomeComponent,
    CategoryComponent,
    LoginComponent,
    ProductsComponent,
    LoadingSpinnerComponent,
    SingleCategoryComponent,
    AddProductComponent,
    AddCategoryComponent,
    SingleProductComponent,
    ModelComponent,
    LogoutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
