import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable,Subject } from 'rxjs';
import {Apis} from 'src/app/_apis/apis'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private refresh = new Subject<any>();
  apiUrl:string = environment.apiUrl;
  constructor(private httpClnt :HttpClient) { }

   /*User SignUp*/
  signUpForm(data:any): Observable<any>{
      return this.httpClnt.post<any>(this.apiUrl+Apis.adminSignUp,data);
  }

  /** User Sign In */
  signInForm(email:any,password:any): Observable<any>{
  const data: any =
      {
      "email": email,
      "password": password
      }

  return this.httpClnt.post<any>(this.apiUrl+Apis.adminLogin,data);
  }

  /** Store token */
  sendToken(token: string) {
  localStorage.setItem("LoggedInUser", token)
  }
 
  /** Get token */
  getToken() {
  return localStorage.getItem("LoggedInUser");
  }

  isLoggedIn() {
  return this.getToken() !== null;
  }

  /** Logout User */
  logout(){
  localStorage.removeItem("LoggedInUser");
  localStorage.clear();
  }

  /** Set user Profile */
  setProfile(profile:any){
  localStorage.setItem("profile", JSON.stringify(profile));
  }

  /* Get User Profile */
  getProfile(){
  return localStorage.getItem("profile");
  }
  /** Remove Profile */
  removeProfile(){
  localStorage.removeItem("profile");
  }

}
