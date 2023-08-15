import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Apis} from 'src/app/_apis/apis'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl:string = environment.apiUrl;
  private objectSource = new BehaviorSubject<any>('');
  currentObject = this.objectSource.asObservable();

  constructor(private httpClnt :HttpClient) { }
  /*Get Products Data */
   getProducts(pageNumber:any,pageSize: any): Observable<any>{
      const data: any = {
          "pageNumber": pageNumber,
          "pageSize": pageSize
       }
       return this.httpClnt.post<any>(this.apiUrl+Apis.getAllProducts,data);
   }
   /** get single product */
   getSingleProduct(productId:any): Observable<any>{
    
     return this.httpClnt.post<any>(this.apiUrl+Apis.getProductDetail+'?productId='+productId,productId);

   }

   /** Product All data Store */
   sendAllProductsData(data:any){
    localStorage.setItem("productsData", JSON.stringify(data));
   }
    /** Get Products data */
    getAllProdData() {
      return localStorage.getItem("productsData");
      }
    /** Remove products Data */
    removeProductData(){
      localStorage.removeItem("productsData");
      }
   /** Change Object */
   changeObject(message: string) {
    this.objectSource.next(message)
  }
  /** Send Product Data */
  sendProductData(data:any){
    localStorage.setItem("productData", JSON.stringify(data));
  } 
   /** Get Single Product data */
   getProductData() {
    return localStorage.getItem("productData");
    }
  
    /** Clear Product Data */
    clearProductData(){
    localStorage.removeItem("productData");
    }
  /** Product single status */
  updateSingleProductStatus(productID:any,status:any){
    const data = {
    }
    return this.httpClnt.post<any>(this.apiUrl+Apis.productSingleStatus+"?productId="+productID+"&isProductActive="+status,data);
  }
  /** Set Products Status */
  updateProductStatus(data:any){
    return this.httpClnt.post<any>(this.apiUrl+Apis.productStatus,data);
  }
}
