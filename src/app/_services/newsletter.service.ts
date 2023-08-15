import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Apis} from 'src/app/_apis/apis';
@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  apiUrl:string = environment.apiUrl;
  constructor(private httpClnt :HttpClient) { }

  /** Get NewsLetter */
getNewsLetterList(): Observable<any>{
   return this.httpClnt.get<any>(this.apiUrl+Apis.newsLetterList)
 }

 /** Delete NewsLetter */
deleteNewsLetter(ID: any): Observable<any>{
  const data = {

  }
  return this.httpClnt.post<any>(this.apiUrl+Apis.deleteNewsLetter+ID,data)
}
/** Add NewsLetter */
addNewsLetter(data:any): Observable<any>{
  return this.httpClnt.post<any>(this.apiUrl+Apis.addNewsLetter,data);
}

}
