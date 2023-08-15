import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { BannerService } from 'src/app/_services/banner.service';
import { CommonCategoriesService } from 'src/app/_services/common-categories.service';
import { ProductService } from 'src/app/_services/product.service';
import { RecipeService } from 'src/app/_services/recipe.service';
import { environment } from 'src/environments/environment';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import {DataUrl, DOC_ORIENTATION, NgxImageCompressService, UploadResponse,} from 'ngx-image-compress';
import { CollectionService } from 'src/app/_services/collection.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.css']
})
export class AddBannerComponent implements OnInit { 
  modalRef!: BsModalRef;
  bannerID:any;
  title: any;
  buttonName = "save"; 
  bannerForm!: FormGroup;
  showImages: any;
  imagePath: string = environment.imagePath;
  image:any;
  submitted: boolean = false;
  images:any = [];
  editImages: any;
  singleImage: any;
  bannerDetailImageId: any;
  singleItem: any;
  productsName: Array<any> = [];
  catIds: Array<any> = [];
  catItem: any;
  allCategories: any;
  dropdownList: any;
  selectedItems:any;
  dropdownSettings: any;
  allProducts:any = [];
  searchProducts:any = [];
  dropdownRecipeSettings:any;
  allRecipes: any;
  dropdownCategorySettings: any;
  dropdownSubCategorySettings:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCatProdRecipe: any;
  imgCropped: any;
  imageMessage: boolean = false;
  imagesLimitOrType: any;
  /** Banner choose categories products and recipes Variables */

  recipeProductError:boolean = false;
  recipeProductIDs:Array<any>= [];
  recipeCategoriesID:Array<any> = [];
  bannerSubCategoryId:Array<any> = [];
  recipeRecipesID:Array<any> = [];
  recipeChooseProduct: boolean = false;
  recipeChooseRecipe: boolean = false;
  recipeCollectionOr: boolean =  true;
  recipeProductOr: boolean =  true;
  recipeChooseCollection: boolean = false;
  classProduct:any ="3";
  selectedRecipes:Array<any> = [];
  selectedCollections:Array<any> = [];
  productDescription: any = [];
  bannerList: any;
  bannerCollectionsID:Array<any> = [];
  allCollections: any = [{collectionId: '',collectionName: ''}];
  dropdownCollectionsSettings: any;
  allCollectionData: any = [];
  isLoaderImage: boolean = false

  productSalePrice: any;
  productavailableQuantity: any;
  recipeIDData:any;
  collectionIDData:any;
  imageType: Array<string> = ['image/jpg', 'image/jpeg', 'image/png']
  /** sub category variable */
 subCategoryList:Array<any> = [];
 subCategoriesNames:Array<any> = [];
 subCategoryNames: any;
 subCatId:Array<any> = [];
 formChanged: boolean = false;
 isChooseNotify:boolean=false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private bannerService: BannerService,
    private zone: NgZone,
    private productService: ProductService,
    private categoryService: CommonCategoriesService,
    private router: Router,
    private recipeService: RecipeService,
    private searchString: SearchStringPipe,
    private collectionService: CollectionService,
    private modalService: BsModalService

  ) { }

  ngOnInit(): void {
    
    this.bannerForm = this.formBuilder.group({
      featureBannerImage: [''],
      featureBannerType: ['', [Validators.required]],
      categoryId:  [''],
      subCategoryId: [''],
      productId: [''],
      recipeId: [''],
      collectionId: [''],
      sequenceNumber: ['', [Validators.required,Validators.min(1)]]

    });
    this.bannerForm.valueChanges.subscribe(val => {
      localStorage.setItem("isFormChanged", JSON.stringify(true));
    });
    console.log(this.bannerForm['controls'])
    this.getBannerList();
    this.getListCollections();
    this.getListRecipes();
    
    this.getAllProductsName();
    this.allCategoriesList();
    
    this.dropdownSettings = {
      idField: 'productId',
      textField: 'productDescription',
      allowSearchFilter: true
    };
    this.dropdownRecipeSettings = {
      idField: 'recipeId',
      textField: 'recipeTitle',
      allowSearchFilter: true
    };
    this.dropdownCategorySettings = {
      idField: 'categoryId',
      textField: 'categoryId',
      allowSearchFilter: true,
      singleSelection: true,
    };
    this.dropdownSubCategorySettings = {
      idField: 'subCategoryId',
      textField: 'subCategoryId',
      allowSearchFilter: true
    }
    this.dropdownCollectionsSettings = {
      idField: 'collectionId',
      textField: 'collectionName',
      allowSearchFilter: true
    }
  
  this.getParamID();

  }
  getParamID(){
    this.activatedRoute.params.subscribe((param: Params) => {
      this.bannerID = param['id'];
      if(this.bannerID){
        this.getBannerDataWithId(this.bannerID);
      }
     
    })
  
    if(this.bannerID){
      this.title = "Edit Banner";
      this.buttonName = "update"
    }else{
      this.title = "Add New Banner";  
      this.buttonName = "save"
    }
  }
  get f() { return this.bannerForm['controls']; }

  /** Get Banner Detail with Id */
  getBannerDataWithId(ID:any){
    this.bannerService.bannerDetail(ID).subscribe(res=>{
      if(res.data.categoryId){
        this.getProductsWithId(res.data?.categoryId?.split(','));
        this.getSubCategoriesWithID(res.data?.categoryId?.split(','))
      }
      

    /** Recipe Data */
    
    if(res.data.recipeId !="" && res.data.recipeId !=null ){
      res.data.recipeId?.split(',').forEach((ele:any) => {

        const serchRecipes = this.searchString?.transform('recipeId',this.allRecipes,ele);
        serchRecipes.forEach((element2:any) => {
         if(ele == element2.recipeId){
           this.selectedRecipes.push(element2)
         }
       }) 
       })
       this.recipeIDData = this.getUniqueListBy(this.selectedRecipes,'recipeId');
       console.log(this.recipeIDData)
    }
   

    /** Collection Data */
    if(!res.data.recipeId && res.data.recipeId !=null ){
      res.data.collectionId?.split(',').forEach((ele2:any) => {
        console.log(ele2)
        const serchCollections = this.searchString?.transform('collectionId',this.allCollections,ele2);
        console.log(serchCollections)
        serchCollections.forEach((element2:any) => {
          console.log(ele2)
          if(ele2 == element2.collectionId){
            this.allCollectionData.push({collectionId: element2.collectionId,collectionName: element2.collectionName})
          }
          
        }) 
       })
     this.collectionIDData = this.getUniqueListBy(this.allCollectionData,'collectionId');
      console.log(this.collectionIDData)
    }
    
      /** Product Data */
      res.data.productId?.split(',').forEach((element:any) => {
      const serchProduct = this.searchString.transform('productId',this.productsName,element);
      serchProduct.forEach((element2:any) => {
        if(element == element2.productId){
          this.productDescription.push({productId:element2.productId,productDescription:element2.productDescription})
        }
      }) 
    });
    if(res.data.productId != null && res.data.productId !=""){
      this.recipeChooseProduct = true;
      this.recipeChooseRecipe = false;
      this.recipeProductOr = false;
      this.classProduct = "12";
      this.recipeChooseCollection = false;
      this.recipeCollectionOr = false;
    }else if(res.data.recipeId != null && res.data.recipeId !=""){
      this.recipeChooseProduct = false;
      this.recipeChooseRecipe = true;
      this.recipeProductOr = false;
      this.classProduct = "12";
      this.recipeChooseCollection = false;
      this.recipeCollectionOr = false;
    }else{
      this.recipeChooseProduct = false;
      this.recipeChooseRecipe = false;
      this.recipeProductOr = false;
      this.recipeChooseCollection = true;
      this.recipeCollectionOr = false;
      this.classProduct = "12";
    }
    
    const data = this.getUniqueListBy(this.productDescription,'productId');
    console.log(res.data)
      //this.bannerForm.patchValue(res.data)
      let categories = res.data.categoryId?.split(',');
      if(categories[0] == ""){
        categories = null;
      }
      console.log(categories)
      this.bannerForm.patchValue({
      featureBannerType: res.data.featureBannerType,
      categoryId:  categories,
      subCategoryId:  res.data.subCategoryId?.split(','),
      productId: data,
      recipeId: this.recipeIDData,
      collectionId: this.collectionIDData,
      sequenceNumber: res.data.sequenceNumber
      })
      this.editImages = res.data.featureBannerImage;
      this.showCatProdRecipe = res.data.featureBannerType;
      
    })
   }

  uploadImage(event: any) {
    //this.image = event.target.files[0];
      //this.uploadFile()
      
      let images = event.target.files;
      for (var i = 0; i < images.length; i++) {
          this.images.push(images[i]);
      }
      if(this.bannerID){
        this.uploadImages(this.bannerID);
       }else{
        this.base(event);
       }
     
  }
  /** Remove Duplicate records */
  getUniqueListBy(arr:any, key:any) {
    return [...new Map(arr.map((item:any) => [item[key], item])).values()]
  }
  /** confirmation Popup  */
  openModal(template: TemplateRef<any>) {
    this.formValidations(template);
  }
 /** close popup  */
 /** from validations */
 formValidations(template:any){
  this.submitted = true;
  // stop here if form is invalid
  console.log(this.bannerForm.value)
  if(this.showCatProdRecipe == 'Home'){
   if(this.bannerForm.value.productId?.length == 0){
     this.bannerForm.value.productId = "";
   }
   if(this.bannerForm.value.recipeId?.length == 0){
    this.bannerForm.value.recipeId = "";
  }
  if(this.bannerForm.value.collectionId?.length == 0){
    this.bannerForm.value.collectionId = "";
  }
   

    if(!this.bannerForm.value.productId && !this.bannerForm.value.recipeId&& !this.bannerForm.value.collectionId){
      this.recipeProductError = true;
      return
    }else{
      this.recipeProductError = false;
    }
  }
  
  if(this.bannerForm.value.collectionId){
      this.getcollectionsId(this.bannerForm.value.collectionId);
  }
  if(this.editImages){
    if(this.croppedImage){
      this.imageMessage = false
    }
    
  }else{
    if(this.croppedImage == ''){
      this.imageMessage = true
      return
    }
  }
  if (this.bannerForm.invalid) {
    return;
}
 if(this.bannerForm.value.productId){
  this.getProductIds(this.bannerForm.value.productId);
 }
 if(this.bannerForm.value.recipeId){
  this.getRecipeIds(this.bannerForm.value.recipeId);
 }
 if(this.bannerForm.value.categoryId){
   this.getCategoriesId(this.bannerForm.value.categoryId);
 }
 if(this.bannerForm.value.subCategoryId){
  this.getSubCategoriesId(this.bannerForm.value.subCategoryId);
}
  this.modalRef = this.modalService.show(template);
 }
 /** end form validations */
 /** add and edit banner */
  submit(){
    this.modalRef.hide();
   
    this.isLoaderImage = true
    if(this.bannerID){
      this.bannerForm.value.featureBannerId = this.bannerID;
      this.bannerService.updateBanner(this.bannerForm.value).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
          this.uploadImages(this.bannerID);
           this.toastr.success(res.message);
          //  this.zone.run(()=>{
          //   this.router.navigate(["/banners"]);
          // })
        }else{
          this.toastr.success(res.message);
        }
      })
    }else{
      
      this.bannerService.addBanner(this.bannerForm.value).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
          this.uploadImages(res.data);
          this.showImages = res.data;
           this.toastr.success(res.message);
        }else{
          this.toastr.success(res.message);
        }
      })
    }
    

  }
/** upload images with object */
  uploadImages(bannerId:any){
    let formData = new FormData();
    
    formData.append('featureBannerId', bannerId);
    if(this.bannerID){
      // this.images.forEach((file:any) => {
      //   formData.append('uploadedFeatureBannerImage', file);
      // });
      formData.append('uploadedFeatureBannerImage', this.imgCropped);
      formData.append('featureBannerImage', this.editImages);
      this.images = [];
      this.bannerService.updateBannerImages(formData).subscribe(res=>{
        if(res.success){
          this.zone.run(()=>{
            this.router.navigate(["/banners"]);
          })
           //this.toastr.success(res.message);
        }
        this.zone.run(()=>{
          this.getBannerDataWithId(this.bannerID);
        })
      })
    
    }else{
    //   this.images.forEach((file:any) => {
    //     formData.append('featureBannerImage', file);
    // });
      formData.append('featureBannerImage', this.imgCropped);
      this.images = [];
      this.bannerService.uploadBannerImages(formData).subscribe(res=>{
        this.zone.run(()=>{
          this.router.navigate(["/banners"]);
        })
      })
    }
    
  }

   /** edit Single image with imagesid */

   singleImageUpdate(event: any,data:any){
    this.singleImage = event.target.files[0];
    let formData = new FormData();
    formData.append('featureBannerDetailId', data.featureBannerDetailId);
    formData.append('featureBannerDetailImagePath', data.featureBannerDetailImagePath);
    formData.append('featureBannerId', data.featureBannerId);
    formData.append('uploadedFeatureBannerImage', this.singleImage);
    this.bannerService.updateBannerSingleImage(formData).subscribe(res=>{
      if(res.success){
        this.toastr.success(res.message);
     }
     this.zone.run(()=>{
       this.getBannerDataWithId(this.bannerID);
     })
    })
    
  }
  getDeleteID(data:any){
    this.bannerDetailImageId = data.featureBannerDetailId
  }
  /** Delete Single image with imagesid */
  deleteSingleImage(){
    this.bannerService.deleteSingleImage(this.bannerDetailImageId).subscribe(res=>{
      if(res.success){
        this.toastr.success(res.message);
     }
     this.zone.run(()=>{
       this.getBannerDataWithId(this.bannerID);
     })
    })
  }

  /** Get products name or product ID */
  getAllProductsName(){
    let prodData:any = this.productService.getAllProdData();
    this.allProducts = JSON.parse(prodData);
    // this.productService.getProducts(1,100000).subscribe(res=>{
    //   this.allProducts = res.items;
      // res.items.forEach((element:any,index:any )=> {
      //    this.singleItem = element.productDescription;
      //    if(element.productId && element.productDescription){
      //     this.productsName.push({productId: element.productId,productDescription: element.productDescription})
      //    }
         
      // });
    //})
   }
  /** select search product name and product id */
  selectEvent(event:any){
    this.bannerForm.value.productId = event.productId;

  }

  /** Get All Categories */

  allCategoriesList(){
    this.categoryService.getAllcategories().subscribe(res=>{
      this.allCategories = res.items.filter(function(e:any) {
        return e.categoryId != null;
      });
      // res.items.forEach((element:any,index:any )=> {
      //   this.catItem = element.categoryId;
      //   if( element.categoryId){
      //     this.catIds.push({categoryId: element.categoryId})
      //   }
        
     //});
    })
  }

  /**get data for on categories Categories */
  selectCategoryEvent(event:any){
    this.catIds = [];
    this.catIds.push({categoryId: event.categoryId})
    
  /** This is only for one field */
  // const serchProduct = this.serchString.transform('categoryId',this.allProducts,searchString);
  // serchProduct.forEach((element:any) => {
  //   if(element.productDescription){
  //     isDisabled = false;
  //     this.productSalePrice = element.salesPrice;
  //     this.productavailableQuantity = element.availableQuantity;
  //     if(this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined){
  //       isDisabled = true;
  //     }else if(this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined){
  //       isDisabled = true;
  //     }
  //     this.productsName.push({productId:element.productId,productDescription:element.productDescription,isDisabled: isDisabled})
  //   }
    
  // });
  // this.serchProducts = this.productsName.filter(function(e) {
  //   return e.productDescription !== '';
  // });
   this.getListRecipes();
   this.subCategories();
   this.bannerForm.patchValue({
    collectionId: [],
    recipeId: []
  });
 }
 /** Select All categories from multiselect */
 onSelectAllCategory(event:any){
  this.searchProducts = this.allProducts;
  this.getListRecipes();
 }
 /** Delete All Select Categories */
 onDeSelectAllCategory(event:any){
  this.searchProducts = [];
 }
 /** Delete Select Categories */
 
 DropDownClose(event:any){
  this.subCategoryNames = [];
  this.searchProducts = [];
  this.subCategoriesNames = [];
  this.catIds = [];
  this.subCategoryList = [];  

 }
/** This  function use for products */
onItemSelect(item: any) {
  if(this.bannerForm.value.collectionId.length > 0 || this.bannerForm.value.recipeId.length > 0){
    this.bannerForm.patchValue({
      collectionId: [],
      recipeId: []
    });
    this.chooseConfirmation();
  }
  this.recipeProductError = false;
  this.recipeChooseProduct = true;
  this.recipeChooseRecipe = false;
  this.recipeProductOr = false;
  this.recipeChooseCollection = false;
   this.recipeCollectionOr = false;
  this.classProduct = "12";
}
DropProduct(event:any){
  const data = this.bannerForm['controls']['productId'].value;
  if(data.length == 0){
    this.recipeChooseProduct = false;
  this.recipeChooseRecipe = false;
  this.recipeProductOr = true;
  this.recipeChooseCollection = false;
   this.recipeCollectionOr = true;
  this.classProduct = "3";
  }

}
onDeSelectAllProducts(event:any){
  const data = event;
  if(data.length == 0){
    this.recipeChooseProduct = false;
  this.recipeChooseRecipe = false;
  this.recipeProductOr = true;
  this.recipeChooseCollection = false;
   this.recipeCollectionOr = true;
  this.classProduct = "3";
  }
}
onSelectAllProducts(item:any){
  this.recipeProductError = false;
  this.recipeChooseProduct = true;
  this.recipeChooseRecipe = false;
  this.recipeProductOr = false;
  this.recipeChooseCollection = false;
   this.recipeCollectionOr = false;
  this.classProduct = "12";
}
/** Get All Recipes */

getListRecipes(){
  
  this.recipeService.getRecipes().subscribe(res=>{
    this.recipeService.removeRecipeData();
    this.allRecipes = res.items;
    this.recipeService.sendAllRecipesData(this.allRecipes);
    })  
const data:any = this.recipeService.getAllRecipesData();
this.allRecipes = JSON.parse(data);
console.log(this.allRecipes);
}
onItemSelectRecipe(item: any){
  if(this.bannerForm.value.productId.length > 0 || this.bannerForm.value.collectionId.length > 0){
    this.bannerForm.patchValue({
      productId: [],
      collectionId: []
    });
    this.chooseConfirmation();
  }
  this.recipeProductError = false;
  this.recipeChooseProduct = false;
  this.recipeChooseRecipe = true;
  this.recipeProductOr = false;
  this.recipeChooseCollection = false;
   this.recipeCollectionOr = false;
  this.classProduct = "12";
  this.clearData();
  
}

clearData(){
  this.bannerForm.patchValue({
    categoryId: '',
    subCategoryId: '',
    productId: ''
  })
  this.subCategoryNames = [];
  this.searchProducts = [];
}
onSelectAllRecipe(item:any){
  this.recipeChooseProduct = false;
  this.recipeChooseRecipe = true;
  this.recipeProductOr = false;
  this.recipeChooseCollection = false;
   this.recipeCollectionOr = false;
  this.classProduct = "12";
  this.clearData;
}
DropRecipe(item:any){
  const data = this.bannerForm['controls']['recipeId'].value;
  if(data.length == 0){
    this.recipeChooseProduct = false;
  this.recipeChooseRecipe = false;
  this.recipeProductOr = true;
  this.recipeChooseCollection = false;
   this.recipeCollectionOr = true;
  this.classProduct = "3";
  }
}
onDeSelectAllRecipe(item:any){
  const data = item;
  if(data.length == 0){
    this.recipeChooseProduct = false;
  this.recipeChooseRecipe = false;
  this.recipeProductOr = true;
  this.recipeChooseCollection = false;
   this.recipeCollectionOr = true;
  this.classProduct = "3";
  }
}
/** Get All Collections */

getListCollections(){
  
  this.collectionService.getAllCollection(1,1000).subscribe(res=>{
    this.collectionService.removeCollectionsData();
    this.allCollections = res.items;
    this.collectionService.sendAllCollectionsData(this.allCollections);
    }) 
  this.allCollections  =  this.collectionService.getAlCollectionsData();
  this.allCollections = JSON.parse(this.allCollections);
  //this.allCollections = this.getUniqueListBy(this.allCollections,'collectionName');
 }

 chooseConfirmation(){
   if(!this.isChooseNotify){
    //  this.toastr.warning("You can only select one of them - Products or Recipes or Collections!");
     this.isChooseNotify = false;
   }
 }

 onItemSelectCollection(item: any){
  if(this.bannerForm.value.productId.length > 0 || this.bannerForm.value.recipeId.length > 0){
    this.bannerForm.patchValue({
      productId: [],
      recipeId: []
    });
    this.chooseConfirmation();
  }
   this.recipeProductError = false;
   this.recipeChooseProduct = false;
   this.recipeChooseRecipe = false;
   this.recipeProductOr = false;
   this.recipeChooseCollection = true;
   this.recipeCollectionOr = false;
   this.classProduct = "12";
   this.clearData();
 }
 onSelectAllCollection(item:any){
   this.recipeProductError = false;
   this.recipeChooseProduct = false;
   this.recipeChooseRecipe = false;
   this.recipeProductOr = false;
   this.recipeCollectionOr = false;
   this.recipeChooseCollection = true;
   this.classProduct = "12";
   this.clearData()
 }
 /** Remove Single Collection data */
DropDownCollectionClose(item:any){
  const data = this.bannerForm['controls']['collectionId'].value;
  if(data.length == 0){
    this.recipeChooseProduct = false;
  this.recipeChooseRecipe = false;
  this.recipeProductOr = true;
  this.recipeChooseCollection = false;
   this.recipeCollectionOr = true;
  this.classProduct = "3";
  }
}
/** Remove All Collection Data */
onDeSelectCollections(items:any){
  const data = items;
  if(data.length == 0){
    this.recipeChooseProduct = false;
  this.recipeChooseRecipe = false;
  this.recipeProductOr = true;
  this.recipeChooseCollection = false;
   this.recipeCollectionOr = true;
  this.classProduct = "3";
  }
}

/** Get string product Ids */

getProductIds(data:any){
  this.recipeProductIDs = [];
  data.forEach((element:any) => {
    this.recipeProductIDs.push(element.productId)
  });
  this.bannerForm.value.productId = this.recipeProductIDs.join(',');
}
/** Get Recipe Ids */
getRecipeIds(data:any){
  data.forEach((element:any) => {
    this.recipeRecipesID.push(element.recipeId)
  });
  this.bannerForm.value.recipeId = this.recipeRecipesID.join(',');
}
/** Get Collections Ids */
getcollectionsId(data:any){
  
  data.forEach((element:any) => {
    if(element?.collectionId){
      this.bannerCollectionsID.push(element.collectionId)
    }else{
      this.bannerCollectionsID.push(element)
    }      
  });
  this.bannerForm.value.collectionId = this.bannerCollectionsID.join(',');
}
/** Get Sub categories  Ids */
getSubCategoriesId(data:any){
  
  data.forEach((element:any) => {
    if(element?.subCategoryId){
      this.bannerSubCategoryId.push(element.subCategoryId)
    }else{
      this.bannerSubCategoryId.push(element)
    }

    
  });
  this.bannerForm.value.subCategoryId = this.bannerSubCategoryId.join(',');
}
/** Get Categories Ids */
getCategoriesId(data:any){
  
    data.forEach((element:any) => {
      if(element?.categoryId){
        this.recipeCategoriesID.push(element.categoryId)
      }else{
        this.recipeCategoriesID.push(element)
      }

      
    });
    this.bannerForm.value.categoryId = this.recipeCategoriesID.join(',');
}
/** Get Sub-Category with categories id */
getSubCategoriesWithID(data:any){
  console.log(data)
  data?.forEach((element:any) => {
    console.log(element)
    const formData: FormData = new FormData();
    formData.append('categoryId', element)
    this.categoryService.getAllSubcategories(formData).subscribe(res=>{
      console.log(res)
      this.subCategoryList.push(res.items);
      this.subCategoryName(this.subCategoryList)
    })
   });
}
/** getProductsWith categories id */

getProductsWithId(ID:any){
  let isDisabled: boolean = false;
  ID.forEach((element:any) => {
    this.catIds.push({categoryId: element})
  });
  //
  const products = [];
  //const searchString = event.categoryId;
/** This is only for one field */
this.catIds.forEach((res:any)=>{
const serchProduct = this.searchString.transform('categoryId',this.allProducts,res.categoryId);
serchProduct.forEach((element:any) => {
  isDisabled = false;
  if(element.productDescription){
    this.productSalePrice = element.salesPrice;
    this.productavailableQuantity = element.availableQuantity;
    if(this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined){
      isDisabled = true;
    }else if(this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined){
      isDisabled = true;
    }
    this.productsName.push({productId:element.productId,productDescription:element.productDescription,isDisabled: isDisabled})
  }
  
});
this.searchProducts = this.productsName.filter(function(e) {
  return e.productDescription !== '';
});
})
 this.getListRecipes();
}


/** Get Banner List */
getBannerList(){
  this.bannerService.getAllBanners().subscribe(res=>{
    this.bannerList = this.getUniqueListBy(res.items,'featureBannerType');
  })
}
changeType(event:any){
  this.showCatProdRecipe = event.target.value;
 
}

/** file to convert base 64 Url*/
base(event: any) {
  const that = this
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
   this.croppedImage = reader.result;
  };
  }
  /** Demo croper image */
fileChangeEvent(event: any): void {
  
  if (this.imageType.includes(event.target.files[0].type)) {
    if (event.target.files[0].size / 1024 / 1024 < 2) {
      this.imagesLimitOrType = "";
      this.imageChangedEvent = event;
    }else{
      this.imagesLimitOrType = "Image Size Should Be Less Than 2 Mb";
      this.croppedImage = "";
     }
  }else{
    this.imagesLimitOrType = "Invalid File Type";
    this.croppedImage = "";
  }
  this.imageMessage = false;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
     if(this.imageChangedEvent){
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
  
  this.imgCropped = new File([u8arr], filename, {type:mime});
  
}

/** Get Subcategories form multiselect categories */
subCategories(){
  this.subCategoryList = []
  this.catIds.forEach(element => {
   const formData: FormData = new FormData();
   formData.append('categoryId', element.categoryId)
   this.categoryService.getAllSubcategories(formData).subscribe(res=>{
     this.subCategoryList.push(res.items);
     this.subCategoryName(this.subCategoryList)
   })
  });

 
 }
 subCategoryName(data:any){
   this.subCategoriesNames = [];
  data[0].forEach((element:any) => {
    this.subCategoriesNames.push({subCategoryId: element.subCategoryId})
  });
 this.subCategoryNames =  this.subCategoriesNames;
 }
 /** Select single cat or more then one */
 selectSubCategoryEvent(event:any){
   this.subCatId.push({subCategoryId: event.subCategoryId});
   this.dataForSingleSubcategories(this.catIds[0]?.categoryId,event.subCategoryId)
 }
 onSelectAllSubCategory(event:any){
   this.subCatId = event;
   this.searchProducts = [];
   this.dataForAllSubcategories(this.catIds[0]?.categoryId);
 }
 DropSubClose(event:any){
  let isDisabled: boolean = false;
  this.subCatId.forEach((element:any,index:any) => {
    if(element.subCategoryId == event.subCategoryId){
     this.subCatId.splice(index,1)
    }
  });
  if(this.subCatId.length === 0){
    this.searchProducts = [];
  }
   this.productsName = []
   this.subCatId = this.subCatId.filter(function(e) {
    return e.subCategoryId !== '';
  });
   this.subCatId.forEach((element:any)=>{
     if(element.subCategoryId != event.subCategoryId){
      const searchString = this.catIds[0].categoryId;
      const subCategory = element.subCategoryId;
      const serchProduct = this.searchString.transform2('categoryId','subCategoryId',this.allProducts,searchString,subCategory);
      serchProduct.forEach((element:any) => {
        if(element.productDescription){
          isDisabled = false;
          this.productSalePrice = element.salesPrice;
          this.productavailableQuantity = element.availableQuantity;
          if(this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined){
            isDisabled = true;
          }else if(this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined){
            isDisabled = true;
          }
          this.productsName.push({productId:element.productId,productDescription:element.productDescription,isDisabled: isDisabled})
        }
        
      });
      this.searchProducts = this.productsName.filter(function(e) {
        return e.productDescription !== '';
      });
     }

   })
 }
 onDeSelectAllSubCategory(event:any){
  this.searchProducts = [];
 }
 /** Get Products For all Subcategories */
 dataForAllSubcategories(event:any){
   const products = [];
   const searchString = event;
   let isDisabled: boolean = false;
   const serchProduct = this.searchString.transform('categoryId',this.allProducts,searchString);
   serchProduct.forEach((element:any) => {
     if(element.productDescription){
       isDisabled = false;
       this.productSalePrice = element.salesPrice;
       this.productavailableQuantity = element.availableQuantity;
       if(this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined){
         isDisabled = true;
       }else if(this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined){
         isDisabled = true;
       }
       this.productsName.push({productId:element.productId,productDescription:element.productDescription,isDisabled: isDisabled})
     }
     
   });
   this.searchProducts = this.productsName.filter(function(e) {
     return e.productDescription !== '';
   });
 
 }
 /** Get Products For single Sub category */
 dataForSingleSubcategories(cat:any,subCat:any){
   const products = [];
   const searchString = cat;
   const subCategory = subCat;
   let isDisabled: boolean = false;
   const serchProduct = this.searchString.transform2('categoryId','subCategoryId',this.allProducts,searchString,subCategory);
   serchProduct.forEach((element:any) => {
     if(element.productDescription){
       isDisabled = false;
       this.productSalePrice = element.salesPrice;
       this.productavailableQuantity = element.availableQuantity;
       if(this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined){
         isDisabled = true;
       }else if(this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined){
         isDisabled = true;
       }
       this.productsName.push({productId:element.productId,productDescription:element.productDescription,isDisabled: isDisabled})
     }
     
   });
   this.searchProducts = this.productsName.filter(function(e) {
     return e.productDescription !== '';
   });
 
 }

}
