import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Apis} from 'src/app/_apis/apis';

@Injectable({
  providedIn: 'root'
})
export class CommoncontactService {

  apiUrl:string = environment.apiUrl;
  constructor(private httpClnt :HttpClient) { }

/** Terms And Conditions */

  /* Add  Terms Conditions */
  addTermsConditions(data:any): Observable<any>{
      return this.httpClnt.post<any>(this.apiUrl+Apis.addTermsAndConditions,data);
  }

  /* Get Terms Conditions */
  getTermsConditions(){
    const data = {

    }
    return this.httpClnt.post<any>(this.apiUrl+Apis.getTermsAndConditions,data)
  }

   /* Update  Terms Conditions */
   UpdateTermsConditions(items:any,id:any): Observable<any>{
   const data =  {
      "termsAndConditionsId": id,
      "termsAndConditionsContent": items
    }
    return this.httpClnt.post<any>(this.apiUrl+Apis.updateTermsAndConditions,data);
  }


  /** Privacy Policy */


  /* Add  Privacy Policy */
  addPrivacyPolicy(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.addPrivacyPolicy,data);
}

/* Get Privacy Policy */
getPrivacyPolicy(){
  const data = {

  }
  return this.httpClnt.post<any>(this.apiUrl+Apis.getPrivacyPolicy,data)
}

 /* Update Privacy Policy */
 UpdatePrivacyPolicy(items:any,id:any): Observable<any>{
 const data =  {
    "privacyPolicyId": id,
    "privacyPolicyContent": items
  }
  return this.httpClnt.post<any>(this.apiUrl+Apis.updatePrivacyPolicy,data);
}

/** Contact Info */


  /* Add  Contact Info */
  addContactInfo(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.addContactInfo,data);
}

/* Get Contact Info */
getContactInfo(){
  const data = {

  }
  return this.httpClnt.post<any>(this.apiUrl+Apis.getContactInfo,data)
}

 /* Update Contact Info */
 UpdateContactInfo(data:any): Observable<any>{
  return this.httpClnt.post<any>(this.apiUrl+Apis.updateContactInfo,data);
}

/** Get Notifications List */
notificationsList(){
  return this.httpClnt.get<any>(this.apiUrl+Apis.notificationList)
}
/** Add notification */
addNotification(data:any): Observable<any>{
  return this.httpClnt.post<any>(this.apiUrl+Apis.addNotification,data);
}
/** Delete notification */
deleteNotification(id:any): Observable<any>{
  const data = {

  }
  return this.httpClnt.post<any>(this.apiUrl+Apis.deleteNotification+"?notificationId="+id,data);
}

/** get countries */
getAllCountries(){
 const data = {}
  return this.httpClnt.post<any>(this.apiUrl+Apis.getCountriesList,data)
}
/** add country */
addCountry(data:any): Observable<any>{
  return this.httpClnt.post<any>(this.apiUrl+Apis.countryAdd,data);
}

/** Delete Country */
deleteCountry(id:any): Observable<any>{
  const data = {

  }
  return this.httpClnt.post<any>(this.apiUrl+Apis.deleteCountry+"?countryId="+id,data);
}

/** get countries */
getAllCities(){
  const data = {}
   return this.httpClnt.post<any>(this.apiUrl+Apis.citiesList,data)
 }
 /** add country */
 addCity(data:any): Observable<any>{
   return this.httpClnt.post<any>(this.apiUrl+Apis.addCity,data);
 }
 /** Delete City */
deleteCity(id:any): Observable<any>{
  const data = {

  }
  return this.httpClnt.post<any>(this.apiUrl+Apis.deleteCity+"?cityId="+id,data);
}
/** Update City */
updateCity(data:any){
  return this.httpClnt.post<any>(this.apiUrl+Apis.updateCity,data);
}
/** This for active and deactivate menu class
 * 
 */

/** Send Date */
sendActiveClass(data:any){
  localStorage.setItem("activeClass", data);
} 
 /** Get Single Date data */
 getActiveClass() {
  return localStorage.getItem("activeClass");
  }
  /** Clear Date Data */
  clearActiveClass(){
  localStorage.removeItem("activeClass");
  }
}
