import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Apis} from 'src/app/_apis/apis'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl:string = environment.apiUrl;

 
  
  constructor(private httpClnt :HttpClient) { }
  /*Get Orders Data Data */
  getAllOrders(): Observable<any>{
    const data = {}
    return this.httpClnt.post<any>(this.apiUrl+Apis.orderList,data);
  }
  /** Export Orders */
  exportCsvFile(){
    const data = {}
    return this.httpClnt.post<any>(this.apiUrl+Apis.createCsvFile,data);
  }
  /** Export Single Orders */
  exportSingleCsvFile(id:any){
    const data = {}
    return this.httpClnt.post<any>(this.apiUrl+Apis.createSingleCsvFile+"?salesOrderId="+id,data);
  }

  /** Send envoice */
  sendEmailEnvoice(salesOrderId:any,userId:any): Observable<any>{
    const data = {}
    return this.httpClnt.post<any>(this.apiUrl+Apis.emailOrderInvoice+"?salesOrderId="+salesOrderId+"&userId="+userId,data);
  }

  /*** Local Storage Data */

   /** Send Date */
   sendDateData(data:any){
    localStorage.setItem("dateData", JSON.stringify(data));
  } 
   /** Get Single Date data */
   getDateData() {
    return localStorage.getItem("dateData");
    }
    /** Clear Date Data */
    clearDateData(){
    localStorage.removeItem("dateData");
    }


}
