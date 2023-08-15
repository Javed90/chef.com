import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Apis} from 'src/app/_apis/apis';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  apiUrl:string = environment.apiUrl;
  constructor(private httpClnt :HttpClient) { }

  private objectSource = new BehaviorSubject<any>('');
  currentObject = this.objectSource.asObservable();
  /* Add  Coupon */
  addCoupon(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.addCoupon,data);
}

/* Get  Coupon */
getCoupon(){
  const data = {

  }
  return this.httpClnt.post<any>(this.apiUrl+Apis.GetCoupons,data)
}

 /* Update  Coupon */
 updateCoupon(data:any): Observable<any>{
  return this.httpClnt.post<any>(this.apiUrl+Apis.updateCoupon,data);
}
/** Delete Coupon */
deleteCoupon(ID: any): Observable<any>{
  const data = {

  }
  return this.httpClnt.post<any>(this.apiUrl+Apis.deleteCoupon+ID,data)
}

/** Get Country */
getCountriesList(): Observable<any>{
 const data= {}
  return this.httpClnt.post<any>(this.apiUrl+Apis.getCountriesList,data)
}
/** Get City with country ID  */
getCitiesList(ID:any): Observable<any>{
  return this.httpClnt.get<any>(this.apiUrl+Apis.getCitiesList+ID);
}

 /** Change Object */
 changeObject(message: string) {
  this.objectSource.next(message)
}
/** Send coupon Data */
sendcouponData(data:any){
  localStorage.setItem("couponData", JSON.stringify(data));
} 
 /** Get Single coupon data */
 getcouponData() {
  return localStorage.getItem("couponData");
  }

  /** Clear coupon Data */
  clearcouponData(){
  localStorage.removeItem("couponData");
  }

  /** Send All coupon Data */
sendAllcouponData(data:any){
  localStorage.setItem("AllcouponData", JSON.stringify(data));
} 
 /** Get All coupon Data */
 getAllcouponData() {
  return localStorage.getItem("AllcouponData");
  }

  /** Clear All coupon Data */
  clearAllcouponData(){
  localStorage.removeItem("AllcouponData");
  }
}
