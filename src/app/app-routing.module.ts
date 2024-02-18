import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { authGuard } from './auth.guard';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'category',component:CategoryComponent, canActivate:[authGuard]},
  {path:'product',component:ProductsComponent,canActivate:[authGuard]},
  {path:'single-category',component:SingleCategoryComponent,canActivate:[authGuard]},
  {path:'add-product',component:AddProductComponent,},
  {path:'add-category',component:AddCategoryComponent},
  {path:'single-product',component:SingleProductComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
