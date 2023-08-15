import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { CommonCategoriesService } from 'src/app/_services/common-categories.service';
import { ToastrService } from 'ngx-toastr';
import {environment} from 'src/environments/environment';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.css']
})
export class CategoriesDetailComponent implements OnInit {
  catName: any;
  categoriesList: any;
  subcatname: any;
  image: any;
  isButton: any = false;
  showImages: any;
  imagePath: string = environment.imagePath;
  subCategoryListWithSearch:any;
  total: any;
  p: number = 1;
  inToShow:boolean = true;
  /** crop image */
  imageChangedEvent: any = '';
   croppedImage: any = '';
   imgCropped:any;
   categorycroppedImage: boolean = false;
   isLoaderImage: boolean = false;
  constructor(
    private categoryService: CommonCategoriesService,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private router: Router, 
    private toastr: ToastrService,
    private serchString: SearchStringPipe
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
        this.catName = decodeURIComponent(param['id']);
       // this.catName = JSON.stringify(this.catName)
    });
    this.getAllSubCategories();
  }
  getAllSubCategories(){
    const formData: FormData = new FormData();
    formData.append('categoryId', this.catName)
    this.categoryService.getAllSubcategories(formData).subscribe(res=>{
      this.categoriesList = res.items;
      this.subCategoryListWithSearch = res.items;
      console.log(res);
    })
  }
  getObjectSendUrl(item: any){
    let that = this;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        subCategoryId: JSON.stringify(item.subCategoryId),
        categoryId: JSON.stringify(item.categoryId)

      }
    };
    that.zone.run(()=>{
     that.router.navigate(['/categories/sub-categories/detail'], navigationExtras);
    })
  }
  getSubCatName(item: any){
    this.subcatname = '';
    this.inToShow = true;
    this.subcatname = item.subCategoryId;
    this.showImages = item.subCategoryImage;
    this.croppedImage = '';
    this.imageChangedEvent = '';
    console.log(this.subcatname)
  }

  uploadImage(event: any) {
    this.image = event.target.files[0];
    if(this.image){
      this.isButton = true;
    }
      // let images = event.target.files;
      // console.log(images)
      // for (var i = 0; i < images.length; i++) {
      //     this.images.push(images[i]);
      // }

     
  }
  
  uploadImageWithCategoryName(event:any){
    const formData: FormData = new FormData();
    if(this.image){
    formData.append('fileName',  this.image.name);
    formData.append('subCategoryImage', this.image);
    formData.append('categoryId', this.catName);
    formData.append('subCategoryId', this.subcatname);
    }
    console.log(this.image)
    if(this.showImages){
      if(this.croppedImage){
        this.categorycroppedImage = false
      }else{
        this.categorycroppedImage = true
        return
      }
      
    }else{
      if(this.croppedImage == ''){
        this.categorycroppedImage = true
        return
      }
    }
    this.isLoaderImage = true;
    this.categoryService.editSingleSubCategories(formData).subscribe(res=>{
      if(res.success){
        this.getAllSubCategories();
        this.isLoaderImage = false;
        this.inToShow = false;
        this.showImages = res.data;
        this.toastr.success(res.message);
      }else{
        this.toastr.success(res.message);
      }
    })

  }

   /** Search By collection Type */

   subCategoryTypeSearch(event:any){
    const stringVal = event.target.value.replace(/^\s+|\s+$/gm,'');
    this.subCategoryListWithSearch = this.serchString.transform('subCategoryId',this.categoriesList,stringVal);
    this.p = 1;
    this.total = this.subCategoryListWithSearch.length;
    
  }

  /** Search By Date */
  searchDate(event:any){
    const searchVal = event.target.value.replace(/^\s+|\s+$/gm,'')
    this.subCategoryListWithSearch = this.serchString.transform('subCategoryCreateDate',this.categoriesList,searchVal);
    this.p = 1;
    this.total = this.subCategoryListWithSearch.length;
  }
  /**  croper image */
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent);
}
imageCropped(event: ImageCroppedEvent) {
  this.categorycroppedImage = false;
    this.croppedImage = event.base64;
    console.log(this.croppedImage)
    this.dataURLtoFile(this.croppedImage,this.imageChangedEvent.target.files[0].name,this.imageChangedEvent.target.files[0].type)
}
imageLoaded() {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}
dataURLtoFile(dataurl:any, filename:any,mime:any) {
 
  var arr = dataurl.split(','),
     // mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  this.image = new File([u8arr], filename, {type:mime});
  
}

}
