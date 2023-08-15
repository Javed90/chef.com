import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Apis} from 'src/app/_apis/apis';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  apiUrl:string = environment.apiUrl;
  constructor(private httpClnt :HttpClient) { }

  /*Get collection list Data */
  getAllCollection(pageNumber:any,pageSize:any): Observable<any>{
    const data: any = {
      "pageNumber": pageNumber,
      "pageSize": pageSize
   }
      return this.httpClnt.post<any>(this.apiUrl+Apis.collectionList,data);
  }
  /* Add Collection */
  addCollection(data:any): Observable<any>{
      return this.httpClnt.post<any>(this.apiUrl+Apis.addCollection,data);
  }
  /**uploaded images */
  uploadCollectionImages(data:any){
    return this.httpClnt.post<any>(this.apiUrl+Apis.addCollectionImage,data);
  }
  /**update images */
  updateCollectionImages(data:any){
    return this.httpClnt.post<any>(this.apiUrl+Apis.updateCollectionSingleImage,data);
  }

  /** update collection single image */
  updateCollectionSingleImage(data:any){
    return this.httpClnt.post<any>(this.apiUrl+Apis.updateCollectionSingleImage,data);
  }
  /** collection detail */
  collectionDetail(collectionId:any){
    const data = {

    }
    return this.httpClnt.post<any>(this.apiUrl+Apis.collectionDetail+collectionId,data)
  }
  /** Delete collection single image with imageID */
  deleteSingleImage(collectionId:any){
    const data = {
    }
    return this.httpClnt.post<any>(this.apiUrl+Apis.deleteCollectionSingleImage+"?collectionDetailImageId="+collectionId,data)
  }
  /** Collection Delete */
  deleteCollection(collectionId:any){
    const data = {

    }
    return this.httpClnt.post<any>(this.apiUrl+Apis.deleteCollection+"?collectionId="+collectionId,data)
  }
  /** update Collection */
  updateCollection(data:any): Observable<any>{
 
      return this.httpClnt.post<any>(this.apiUrl+Apis.editCollection,data);
  }

  /** Recipe All data Store */
  sendAllCollectionsData(data:any){
    localStorage.setItem("collectionData", JSON.stringify(data));
   }
    /** Get recipes data */
    getAlCollectionsData() {
      return localStorage.getItem("collectionData");
      }
    /** Remove recipes Data */
    removeCollectionsData(){
      localStorage.removeItem("collectionData");
      }

}
