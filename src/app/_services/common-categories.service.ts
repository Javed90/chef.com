import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Apis} from 'src/app/_apis/apis'

@Injectable({
  providedIn: 'root'
})
export class CommonCategoriesService {
  catId: any;
  subCatID: any;
  subSubCatID: any;
  apiUrl:string = environment.apiUrl;
  private objectSource = new BehaviorSubject<any>('');
  currentCategoryData = this.objectSource.asObservable();
  constructor(private httpClnt :HttpClient) { }

  /*Get Categories Data */
   getAllcategories(): Observable<any>{
       return this.httpClnt.get<any>(this.apiUrl+Apis.categoriesList);
   }
   /** get single category */
   editSingleCategories(data: any): Observable<any>{
     console.log(data)
    //  const data:any = {
    //   categoryImage: categoryImage,
    //   categoryId : categoryId
    //  }
     return this.httpClnt.post<any>(this.apiUrl+Apis.editCategory,data);

   }

   /*Get Sub Categories Data */
   getAllSubcategories(data:any): Observable<any>{
     const parmas = {
      categoryId: data
     }
    return this.httpClnt.post<any>(this.apiUrl+Apis.subCategoriesList,data);
    //return this.httpClnt.get<any>(this.apiUrl+Apis.subCategoriesList+data);
  }
  /** get single sub category */
  editSingleSubCategories(data: any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.editSubCategory,data);

  }

   /*Get Sub Sub Categories Data */
   getAllSubSubcategories(categoryId:any,subCategoryId: any): Observable<any>{
     this.catId = encodeURIComponent(categoryId);
     this.subCatID = encodeURIComponent(subCategoryId);
    return this.httpClnt.get<any>(this.apiUrl+Apis.subSubCategoriesList+'?categoryId='+this.catId+'&subCategoryId='+this.subCatID);
  }
  /** get single sub Sub category */
  editSingleSubSubCategories(data: any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.editSubSubCategory,data);

  }

  /** get products */
  getCategoriesProducts(categoryId:any,subCategoryId: any,subSubCategoryId: any): Observable<any>{
    this.catId = encodeURIComponent(categoryId);
    this.subCatID = encodeURIComponent(subCategoryId);
    this.subSubCatID = encodeURIComponent(subSubCategoryId);
   return this.httpClnt.get<any>(this.apiUrl+Apis.getCategoriesProducts+'?categoryId='+this.catId+'&subCategoryId='+this.subCatID+'&SubSubCategoryId='+this.subSubCatID);
 }
 /** Update Category */
 updateCategory(categoryId: any,categoryDescription:any): Observable<any>{
   const data = {
    categoryId: categoryId,
    categoryDescription: categoryDescription
   }
  return this.httpClnt.post<any>(this.apiUrl+Apis.updateCategory,data);
 }

 /** Send Category Data */
 /** Change Object */
 sendCategoryData(data: string) {
  this.objectSource.next(data)
}
}
