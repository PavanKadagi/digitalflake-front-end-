import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

 

  public httpOptions = {
    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken()),
      'Content-Type': 'application/json',
      
  };

  constructor(private http:HttpClient,private authService:AuthService) { }
  getData(url:string):Observable<any>{
    return this.http.get<any>(url,this.httpOptions)
  }
  postData(url:string,data:any):Observable<any>{
    return this.http.post<any>(url,data,this.httpOptions)
  }

  putData(url:string,data:any):Observable<any>{
    return this.http.put<any>(url,data,this.httpOptions)
  }

  patchData(url:string,data:any):Observable<any>{
    return this.http.patch<any>(url,data,this.httpOptions)
  }

  deleteData(url:string):Observable<any>{
    return this.http.delete<any>(url,this.httpOptions)
  }




}
