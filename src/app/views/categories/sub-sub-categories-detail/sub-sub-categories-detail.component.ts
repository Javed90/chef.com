import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonCategoriesService } from 'src/app/_services/common-categories.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sub-sub-categories-detail',
  templateUrl: './sub-sub-categories-detail.component.html',
  styleUrls: ['./sub-sub-categories-detail.component.css']
})
export class SubSubCategoriesDetailComponent implements OnInit {


  subCatName: any;
  categoryName: any;
  subSubCategory: any;
  getCategoriesProductList: any;
  imagePath: string = environment.imagePath;
  constructor(
    private categoryService: CommonCategoriesService,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    this.getRouteObjec();
  }
  /** Get query Params */
  getRouteObjec(){
    this.activatedRoute.queryParams.subscribe(params=>{
      this.subCatName = JSON.parse(params['subCategoryId']);
      this.categoryName = JSON.parse(params['categoryId']);
      this.subSubCategory = JSON.parse(params['subSubCategoryId']);
      this.getProducts(this.categoryName,this.subCatName,this.subSubCategory);
    })
  }

  /** Get Category products */
  getProducts(categoryId:any,subCategoryId:any,subSubCategoryId:any){
    this.categoryService.getCategoriesProducts(categoryId,subCategoryId,subSubCategoryId).subscribe(res=>{
      this.getCategoriesProductList = res.items;
    })
  }
}
