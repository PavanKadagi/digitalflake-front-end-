import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loading = new EventEmitter<boolean>();
  show = new EventEmitter<boolean>();
  hide = new EventEmitter<boolean>();
  id = new EventEmitter<string>();
  _id:any;
  show1:any

  constructor() { }

  setId(id:string){
    this._id = id
  }

  setShow(show:string){
    this.show1 = show 
  }

  getShow(){
    return this.show1
  }

  getId(){
    return this._id
  }

}
