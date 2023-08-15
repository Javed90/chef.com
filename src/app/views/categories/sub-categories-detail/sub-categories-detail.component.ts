import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { CommonCategoriesService } from 'src/app/_services/common-categories.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sub-categories-detail',
  templateUrl: './sub-categories-detail.component.html',
  styleUrls: ['./sub-categories-detail.component.css']
})
export class SubCategoriesDetailComponent implements OnInit {

  subCatName: any;
  categoryName: any;
  subSubCategoriesList: any;
  subSubcatname: any;
  image: any;
  isButton: any = false;
  showImages: any;
  imagePath: string = environment.imagePath;
  /** crop image */
  imageChangedEvent: any = '';
   croppedImage: any = '';
   imgCropped:any;
   categorycroppedImage: boolean = false;
  constructor(
    private categoryService: CommonCategoriesService,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private router: Router, 
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getRouteObjec();
    
  }
  getSubCatDetail(catName:any,subCatName:any){
    this.categoryService.getAllSubSubcategories(catName,subCatName).subscribe(res=>{
      this.subSubCategoriesList = res.items;
      console.log(res);
    })
  }
  
   /** Get query Params */
  getRouteObjec(){
    this.activatedRoute.queryParams.subscribe(params=>{
      this.subCatName = JSON.parse(params['subCategoryId']);
      this.categoryName = JSON.parse(params['categoryId']);
       this.getSubCatDetail(this.categoryName,this.subCatName);
    })
  }
 /** send url with query Params */
  getObjectSendUrl(item: any){
    let that = this;
    let navigationExtras: NavigationExtras = {
      queryParams: {
      
        subCategoryId: JSON.stringify(item.subCategoryId),
        categoryId: JSON.stringify(item.categoryId),
        subSubCategoryId: JSON.stringify(item.subSubCategoryId)

      }
    };
    that.zone.run(()=>{
     that.router.navigate(['/categories/sub-sub-categories/detail'], navigationExtras);
    })
  }

  /* Get single object */
  getSubCatName(item: any){
    this.subSubcatname = '';
    this.subSubcatname = item.subSubCategoryId;
    this.showImages = item.subSubCategoryImage;
    console.log(this.subSubcatname)
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
    formData.append('fileName',  this.image.name);
    formData.append('subSubCategoryImage', this.image);
    formData.append('categoryId', this.categoryName)
    formData.append('subCategoryId', this.subCatName)
    formData.append('subsubCategoryId', this.subSubcatname);
    
    if(this.showImages){
      if(this.croppedImage){
        this.categorycroppedImage = false
      }
      
    }else{
      if(this.croppedImage == ''){
        this.categorycroppedImage = true
        return
      }
    }
    this.categoryService.editSingleSubSubCategories(formData).subscribe(res=>{
      if(res.success){
        this.showImages = res.data;
        this.toastr.success(res.message);
      }else{
        this.toastr.success(res.message);
      }
    })

  }

  /**  croper image */
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
  this.categorycroppedImage = false;
    this.croppedImage = event.base64;
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
