import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Apis} from 'src/app/_apis/apis'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiUrl:string = environment.apiUrl;
  constructor(private httpClnt :HttpClient) { }
  /*Get recipes Data */
   getRecipes(): Observable<any>{
       const data: any = {
          "pageNumber": 1,
          "pageSize": 10000,
          "searchQuery": "string",
          "userId": "string"
       }
       return this.httpClnt.post<any>(this.apiUrl+Apis.getRecipes,data);
   }
   /** get single product */
   getSingleRecipe(recipeId:any): Observable<any>{
    
     return this.httpClnt.post<any>(this.apiUrl+Apis.getRecipesDetails+'?recipeId='+recipeId,recipeId);

   }
   /*Add Recipe Data */
   addRecipe(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.createRecipe,data);
   }
   /** Update Recipe */
   updateRecipe(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.updateRecipe,data);
   }
   /*Upload Recipe Images */
   uploadRecipeImage(data:any): Observable<any>{
    return this.httpClnt.post<any>(this.apiUrl+Apis.uploadRecipeImages,data);
   }
   /**Delete Recipe Data */
   deleteRecipe(ID: any){
    return this.httpClnt.post<any>(this.apiUrl+Apis.deleteRecipe+ID,ID);
   }

   /**update images */
  updateRecipeImages(data:any){
    return this.httpClnt.post<any>(this.apiUrl+Apis.updateRecipeImages,data);
  }
  /** update Recipe single image */
  updateRecipeSingleImage(data:any){
    return this.httpClnt.post<any>(this.apiUrl+Apis.updateRecipeSingleImage,data);
  }
  /** Delete Recipe single image with imageID */
  deleteSingleImage(recipeId:any){
    const data = {
    }
    return this.httpClnt.post<any>(this.apiUrl+Apis.deleteRecipeImage+"?recipeDetailImageId="+recipeId,data)
  }
  /** Local Stroage Data */

  /** Recipe All data Store */
  sendAllRecipesData(data:any){
    localStorage.setItem("recipesData", JSON.stringify(data));
   }
    /** Get recipes data */
    getAllRecipesData() {
      return localStorage.getItem("recipesData");
      }
    /** Remove recipes Data */
    removeRecipeData(){
      localStorage.removeItem("recipesData");
      }
}
