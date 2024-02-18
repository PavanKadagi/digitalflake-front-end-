import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey = 'auth_token';
  public httpOptions = {
    headers: new HttpHeaders().set('Authorization', 'Bearer' + this.getToken()),
      'Content-Type': 'application/json',
  };
  constructor(private http:HttpClient) { }


  signIn(url:string,data:any) : Observable<any> | null {
    return this.http.post<any>(url,data,this.httpOptions)
  }

   // Check if the user is authenticated
   isAuthenticated(): boolean {
    const token = this.getToken();
    console.log(token,"token ------------")
    return !!token;
  }

 // Get the stored token
 getToken(): string | null {
  return localStorage.getItem(this.tokenKey);
}

// Set the token in local storage
 setToken(token: string): void {
  localStorage.setItem(this.tokenKey, token);
}

  // Remove the token from local storage
   removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

 // Logout method
 logout(): void {
  this.removeToken();
}

}
