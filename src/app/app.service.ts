import { Injectable } from '@angular/core';
import{Observable} from 'rxjs';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import{Cookie} from 'ng2-cookies/ng2-cookies';
import{HttpClient,HttpHeaders,HttpErrorResponse,HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {
private url="https://chatapi.edwisor.com";
  constructor(private http:HttpClient) { }

  public signup=(data):Observable<any>=>{

    const p=new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('mobile',data.mobile)
    .set('email',data.email)
    .set('password',data.password)
    .set('apiKey',data.apiKey)

    return this.http.post(`${this.url}/api/v1/users/signup`,p);
  }

  public signin(data):Observable<any>{
    const p = new HttpParams()
    .set('email',data.email)
    .set('password',data.password)
     return this.http.post(`${this.url}/api/v1/users/login`,p);
  }

  public getUserInfo=()=>{
    return JSON.parse(localStorage.getItem('UserInfo'));
  }

  public setUserInfo=(data)=>{
    localStorage.setItem('UserInfo',JSON.stringify(data));
  }

  public logout=():Observable<any>=>{
    const p= new HttpParams()
    .set('authToken',Cookie.get('authToken'))

    return this.http.post(`${this.url}/api/v1/users/logout`,p);
  }

}
