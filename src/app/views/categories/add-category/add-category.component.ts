import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonCategoriesService } from 'src/app/_services/common-categories.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  modalRef!: BsModalRef;
  image: any;
  catName: any;
  isButton: any = false;
  editCategoryForm!: FormGroup;
  showImages: any;
  imagePath: string = environment.imagePath;
  categoryDescription: any;
  catObj: any;
  catDes:any;
  isLoaderImage:boolean = false;
  imagesLimitOrType: any;
   /** Crop image */
   imageChangedEvent: any = '';
   croppedImage: any = '';
   imgCropped:any;
   categorycroppedImage: boolean = false;
   imageType: Array<string> = ['image/jpg', 'image/jpeg', 'image/png']
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CommonCategoriesService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private zone: NgZone,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.editCategoryForm = this.formBuilder.group({
      categoryImage: [''],
      categoryId: [''],
      categoryDescription: ['',]
    });

    this.getRouteObjec();
    this.editCategoryForm.valueChanges.subscribe(val => {
      localStorage.setItem("isFormChanged", JSON.stringify(true));
    });
  }

  
  get f() { return this.editCategoryForm['controls']; }
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
  /** Descriptions */
  catDescription(event:any){
    this.categoryDescription = event.target.value.replace(/^\s+|\s+$/gm,'');
    console.log(this.categoryDescription)
    this.isButton = true;
    // if(this.categoryDescription){
    //   this.isButton = true;
    // }else{
    //   this.isButton = false;
    // }
  }
   /** confirmation Popup  */
   openModal(template: TemplateRef<any>) {
    this.formValidations(template);
  }
 /** close popup  */
 /** from validations */
 formValidations(template:any){
  this.submitted = true;
  if (this.editCategoryForm.invalid) {
      return;
  }
  
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
  this.modalRef = this.modalService.show(template);
 }
 /** End form validations */
  uploadImageWithCategoryName(){
    this.modalRef.hide();
  const formData: FormData = new FormData();
  if(this.image){
    formData.append('fileName',  this.image.name);
    formData.append('categoryImage', this.image);
  }
  
  formData.append('categoryId', this.catName)
    this.isLoaderImage = true;
    if(this.categoryDescription){
        this.categoryService.updateCategory(this.catName, this.categoryDescription).subscribe(res=>{
          if(res.success){
            this.isLoaderImage = false;
            this.zone.run(()=>{
             this.router.navigate(["/categories"]);
            })
            this.toastr.success(res.message);

          }else{
            this.toastr.success(res.message);
          }
        }) 
    }
    if(this.image){
      this.categoryService.editSingleCategories(formData).subscribe(res=>{
        if(res.success){
          this.showImages = res.data;
          this.isLoaderImage = false;
            this.zone.run(()=>{
             this.router.navigate(["/categories"]);
            })
          this.toastr.success(res.message);
        }else{
          this.toastr.success(res.message);
        }
      })
    }
    if(!this.image && !this.categoryDescription){
      this.categoryService.updateCategory(this.catName, this.categoryDescription).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
          this.zone.run(()=>{
           this.router.navigate(["/categories"]);
          })
          this.toastr.success(res.message);

        }else{
          this.toastr.success(res.message);
        }
      }) 
    }
    

  }
  getRouteObjec(){
    this.categoryService.currentCategoryData.subscribe(categoryObj=> this.catObj = categoryObj)
    this.showImages = this.catObj.categoryImage;
    this.catName = this.catObj.categoryId;
    this.catDes = this.catObj.categoryDescription;
    this.editCategoryForm.patchValue({categoryId: this.catName, categoryDescription: this.catDes })
    // this.activatedRoute.queryParams.subscribe(params=>{
    //   this.showImages = JSON.parse(params['categoryImage']);
    //   this.catName = JSON.parse(params['categoryId']);
      
    // })
    if(!this.catName){
      this.router.navigate(["/categories"]);
    }
  }

    /**  croper image */
    fileChangeEvent(event: any): void {
      
      if (this.imageType.includes(event.target.files[0].type)) {
        if (event.target.files[0].size / 1024 / 1024 < 2) {
          this.imagesLimitOrType = "";
          this.imageChangedEvent = event;
          this.isButton = true;
        }else{
          this.imagesLimitOrType = "Image Size Should Be Less Than 2 Mb";
          this.croppedImage = "";
         }
      }else{
        this.imagesLimitOrType = "Invalid File Type";
        this.croppedImage = "";
      }
    this.categorycroppedImage = false;
  }
  imageCropped(event: ImageCroppedEvent) {
    if(this.imageChangedEvent){
      this.croppedImage = event.base64;
      this.dataURLtoFile(this.croppedImage,this.imageChangedEvent.target.files[0].name,this.imageChangedEvent.target.files[0].type)
    }
      
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
