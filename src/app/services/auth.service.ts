import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any = new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient , private _Router:Router)
  {
    if (localStorage.getItem('uToken') != null)
    {
      this.decode()
    }
  }

  baseUrl:string = 'https://route-ecommerce.onrender.com/'

  decode()
  {
    let incoded = JSON.stringify(localStorage.getItem('uToken'))
    let decoded = jwtDecode(incoded)
    this.userData.next(decoded)
  }

  register(userData:any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}api/v1/auth/signup` , userData)
  }

  login(userData:any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}api/v1/auth/signin` , userData)
  }

  logout()
  {
    localStorage.removeItem('uToken')
    this.userData.next(null)
    this._Router.navigate(['/login'])
  }

  forgetPassword(userEmail:any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}api/v1/auth/forgotPasswords` , userEmail )
  }


  verifyCode(code:any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}api/v1/auth/verifyResetCode` , code )
  }


  resetPassword(userData:any):Observable<any>
  {
  return this._HttpClient.put(`${this.baseUrl}api/v1/auth/resetPassword`, userData )
  }


}
