import { Injectable } from '@angular/core';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class JwtDeocderService {

  constructor() { }
  public decodeToken(token:String){
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g,'+').replace(/-/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c)=>{
      return '%' + ('00'+ c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')
  );
  return JSON.parse(jsonPayload)
  }
}
