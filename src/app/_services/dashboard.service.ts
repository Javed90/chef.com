import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Apis} from 'src/app/_apis/apis';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl:string = environment.apiUrl;
  private objectSource = new BehaviorSubject<any>('');
  currentObject = this.objectSource.asObservable();

  constructor(private httpClnt :HttpClient) { }
  /** Sales Over Time */
  salesOverTime(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.salesOverTime,data);
  }
  /** Sales By Product */
  salesOverProducts(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.salesProducts,data);
  }
  /** Customer over Time */
  customerOverTime(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.customOverTime,data);
  }

  /** Customer List Data */
  customerList(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.customerList,data);
  }
  /** Sales By Discount */
  salesByDiscount(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.salesDiscount,data);
  }
  /** Order over Time */
  orderOverTime(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.ordersOverTime,data);
  }
  /** Order over Time */
  averageOrdersValue(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.averageOrderValue,data);
  }
  /** Coustmer By Revenue */
  customerByRevenue(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.customerByRevenue,data);
  }
  /** Brand By Revenue */
  brandsByRevenue(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.brandsByRevenue,data);
  }
   /** Category By Revenue */
   categoryByRevenue(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.categoryByRevenue,data);
  }
  /** Category By Revenue */
  customersDetails(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.customerDetails,data);
  }
  /**Register and guest users  */
  usersCount(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.usersCount,data);
  }
  /** Change Object */
  changeObject(message: string) {
    this.objectSource.next(message)
  }
  /** Send Sale Product Data */
  sendProductData(data:any){
    localStorage.setItem("saleProductData", JSON.stringify(data));
  } 
   /** Get Single Sale Product data */
   getProductData() {
    return localStorage.getItem("saleProductData");
    }
  /** Clear Sale Product Data */
  clearProductData(){
    localStorage.removeItem("saleProductData");
  }

  /** param for Graphs Sale over Time */
  sendSalesOverTime(data:any){
    localStorage.setItem("salesOvertime", JSON.stringify(data));
  }
  getSalesOverTime(){
    return localStorage.getItem("salesOvertime");
  }
  clearSalesOverTime(){
    localStorage.removeItem("salesOvertime");
  }

  /** param for Graphs Customer Over Time */
  sendCustomerOverTime(data:any){
    localStorage.setItem("customerOvertime", JSON.stringify(data));
  }
  getCustomerOverTime(){
    return localStorage.getItem("customerOvertime");
  }
  clearCustomerOverTime(){
    localStorage.removeItem("customerOvertime");
  }
  /** param for  Customer details */
  sendCustomerDetails(data:any){
    localStorage.setItem("CustomerDetails", JSON.stringify(data));
  }
  getCustomerDetails(){
    return localStorage.getItem("CustomerDetails");
  }
  clearCustomerDetails(){
    localStorage.removeItem("CustomerDetails");
  }
  /** param for  Customer details Fromdate to Todate */
  sendCustomerDetailsFromTo(data:any){
    localStorage.setItem("CustomerDetailsFromTo", JSON.stringify(data));
  }
  getCustomerDetailsFromTo(){
    return localStorage.getItem("CustomerDetailsFromTo");
  }
  clearCustomerDetailsFromTo(){
    localStorage.removeItem("CustomerDetailsFromTo");
  }
  /** param for Sales By Discount */
  sendDiscountData(data:any){
    localStorage.setItem("salesDiscount", JSON.stringify(data));
  }
  getDiscountData(){
    return localStorage.getItem("salesDiscount");
  }
  clearDiscountData(){
    localStorage.removeItem("salesDiscount");
  }

  /** param for Orders Over Time */
  sendOrdersOTData(data:any){
    localStorage.setItem("orderOverT", JSON.stringify(data));
  }
  getOrdersOTData(){
    return localStorage.getItem("orderOverT");
  }
  clearOrdersOTData(){
    localStorage.removeItem("orderOverT");
  }

  /** param for Average Order Value */
  sendAverageOVData(data:any){
    localStorage.setItem("averageOV", JSON.stringify(data));
  }
  getAverageOVData(){
    return localStorage.getItem("averageOV");
  }
  clearAverageOVData(){
    localStorage.removeItem("averageOV");
  }
  /** param for Customers by Revenue */
  sendCustomerBRData(data:any){
    localStorage.setItem("customerBR", JSON.stringify(data));
  }
  getCustomerBRData(){
    return localStorage.getItem("customerBR");
  }
  clearCustomerBRData(){
    localStorage.removeItem("customerBR");
  }
  /** param for Brands by Revenue */
  sendBrandsBRData(data:any){
    localStorage.setItem("BrandsBR", JSON.stringify(data));
  }
  getBrandsBRData(){
    return localStorage.getItem("BrandsBR");
  }
  clearBrandsBRData(){
    localStorage.removeItem("BrandsBR");
  }
    /** param for Categories by Revenue */
    sendCategoriesBRData(data:any){
      localStorage.setItem("categoriesBR", JSON.stringify(data));
    }
    getCategoriesBRData(){
      return localStorage.getItem("categoriesBR");
    }
    clearCategoriesBRData(){
      localStorage.removeItem("categoriesBR");
    }

   /** param for registerd and guest users */
   sendRegisteredUsersData(data:any){
    localStorage.setItem("usersCount", JSON.stringify(data));
  }
  getRegisteredUsersData(){
    return localStorage.getItem("usersCount");
  }
  clearRegisteredUsersData(){
    localStorage.removeItem("usersCount");
  }

  /** Customer List data */
  sendCustomerListData(data:any){
    localStorage.setItem("customerListData", JSON.stringify(data));
  } 
   getCustomerListData() {
    return localStorage.getItem("customerListData");
    }
  clearCustomerListData(){
    localStorage.removeItem("customerListData");
  }

}
