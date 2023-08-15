import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Apis} from 'src/app/_apis/apis';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  apiUrl:string = environment.apiUrl;
  constructor(private httpClnt :HttpClient) { }


  /*Get collection list Data */
  getAllBanners(): Observable<any>{
    const data: any = {
   }
      return this.httpClnt.post<any>(this.apiUrl+Apis.bannerList,data);
  }
  /* Add Banner */
  addBanner(data:any): Observable<any>{
  //   const data: any = {
  //     "featureBannerType": featureBannerType
  //  }
      return this.httpClnt.post<any>(this.apiUrl+Apis.addBanner,data);
  }
  /**uploaded images */
  uploadBannerImages(data:any){
    return this.httpClnt.post<any>(this.apiUrl+Apis.uploadBannerImages,data);
  }
  /** Single Banner detail */
  bannerDetail(featureBannerId:any){
    return this.httpClnt.get<any>(this.apiUrl+Apis.getBannerDetail+"?featureBannerId="+featureBannerId)
  }

  /** Delete Banner */
  deletebanner(bannerId:any){
    const data = {

    }
    return this.httpClnt.post<any>(this.apiUrl+Apis.deleteBanner+"?featureBannerId="+bannerId,data)
  }
  /**update images */
  updateBannerImages(data:any){
    return this.httpClnt.post<any>(this.apiUrl+Apis.updateBannerImage,data);
  }
  /** update Banner single image */
  updateBannerSingleImage(data:any){
    return this.httpClnt.post<any>(this.apiUrl+Apis.updateSingleBannerImage,data);
  }
  /** Delete Banner single image with imageID */
  deleteSingleImage(bannerId:any){
    const data = {
    }
    return this.httpClnt.post<any>(this.apiUrl+Apis.deleteBannerImage+"?featureBannerDetailImageId="+bannerId,data)
  }
  /** update Banner */
  updateBanner(data:any): Observable<any>{
 
    return this.httpClnt.post<any>(this.apiUrl+Apis.updateBanner,data);
}
}
