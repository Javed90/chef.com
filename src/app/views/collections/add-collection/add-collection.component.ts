import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CollectionService } from 'src/app/_services/collection.service';
import { CommonCategoriesService } from 'src/app/_services/common-categories.service';
import { ProductService } from 'src/app/_services/product.service';
import { RecipeService } from 'src/app/_services/recipe.service';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { environment } from 'src/environments/environment';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit {

  modalRef!: BsModalRef;
  collectionForm!: FormGroup;
  showImages:boolean = false;
  imagePath: string = environment.imagePath;
  image:any;
  submitted: boolean = false;
  images:any = [];
  collectionID: any;
  title:any = "Add Collection";
  buttonName: any = "save"
  editImages:any;
  singleImage: any;
  collectionDetailImageId: any;
  /** Collection Type variables */
  collectionName: boolean = false;
  collectionNew: boolean = false;
  collectionOr: boolean = true;
  collectionError: boolean = false;
  collectionProductError:boolean = false;
  collectionProductIDs:Array<any>= [];
  collectionCategoriesID:Array<any> = [];
  collectionSubCategoryId: Array<any> = [];
  collectionRecipesID:Array<any> = [];
  collectionChooseProduct: boolean = false;
  collectionChooseRecipe: boolean = false;
  collectionProductOr: boolean =  true;
  classProduct:any ="4";
  selectedRecipes:Array<any> = [];
  collectionNewName: any;
  collecioncroppedImage: boolean = false;
  isLoaderImage: boolean = false
  imagesLimitOrType: any;
  imageType: Array<string> = ['image/jpg', 'image/jpeg', 'image/png']
  /** Multiselected Variables */

  //productsName = [{productId: '',productDescription: ''}];
  productsName: Array<any> = [];
  catIds = [{categoryId: ''}];
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
  dropdownSubCategorySettings: any;
  productDescription:any = [];
  collections: any =[];
  productSalePrice: any;
  productavailableQuantity: any;

  /** Crop image */
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imgCropped:any;
  baseSixtyFourImage:Array<any> = [];
  
 /** sub category variable */
 subCategoryList:Array<any> = [];
 subCategoriesNames:Array<any> = [];
 subCategoryNames: any;
 subCatId:Array<any> = [];
  constructor( private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private collectionService: CollectionService,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CommonCategoriesService,
    private recipeService: RecipeService,
    private searchString: SearchStringPipe,
    private modalService: BsModalService ) { }

  ngOnInit(): void {
    console.log(this.baseSixtyFourImage)
    this.collectionForm = this.formBuilder.group({
      collectionImage: [''],
      collectionName: [''],
      productId: [''],
      recipeId: [''],
      categoryId: [''],
      subCategoryId: [''],
      isFeatured: ['',[Validators.required]]
    });
    this.collectionForm.valueChanges.subscribe(val => {
      localStorage.setItem("isFormChanged", JSON.stringify(true));
    });
    this.getListRecipes();
    this.activatedRoute.params.subscribe((param: Params) => {
      this.collectionID = param['id'];
      if(this.collectionID){
        this.title = "Edit Collection";
        this.buttonName = "update";
        this.getCollectionDataWithId(this.collectionID);
      }
      this.getAllCollections();
    });
    
  this.multiselectedVariables();
  }

  /** Multi selected  Define Fields name */

  multiselectedVariables(){
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
  }
  /** Get Collection Detail with Id */
  getCollectionDataWithId(ID:any){
    const that = this
   this.collectionService.collectionDetail(ID).subscribe(res=>{
     //this.collectionForm.patchValue(res.data);
     if(res.data.categoryId){
      this.getProductsWithId(res.data.categoryId.split(','));
      this.getSubCategoriesWithID(res.data?.categoryId?.split(','))
     }
    
     
      res.data.productId?.split(',').forEach((element:any) => {
        const serchProduct = this.searchString.transform('productId',this.productsName,element);
        serchProduct.forEach((element2:any) => {
          if(element == element2.productId){
            this.productDescription.push({productId:element2.productId,productDescription:element2.productDescription})
          }
        }) 
    });
    res.data.recipeId?.split(',').forEach((ele:any) => {

     const serchRecipes = this.searchString?.transform('recipeId',this.allRecipes,ele);
     serchRecipes.forEach((element2:any) => {
      if(ele == element2.recipeId){
        this.selectedRecipes.push(element2)
      }
    }) 
    })
    const recipeData = this.getUniqueListBy(this.selectedRecipes,'recipeId');
    if(res.data.productId != null){
      this.collectionChooseProduct = true;
      this.collectionChooseRecipe = false;
      this.collectionProductOr = false;
      this.classProduct = "12";
    }else{
      this.collectionChooseProduct = false;
      this.collectionChooseRecipe = true;
      this.collectionProductOr = false;
      this.classProduct = "12";
    }
    const isFeatured = res.data.isFeatured.toString();
    const data = this.getUniqueListBy(this.productDescription,'productId');
     this.collectionForm.patchValue({collectionName: res.data.collectionName,
      categoryId:res.data.categoryId?.split(','),
      subCategoryId:  res.data.subCategoryId?.split(','),
      productId:data,recipeId:recipeData,isFeatured: isFeatured})
    //  res.data.collectionDetailImage.forEach((element:any)=> {
    //    this.images.push(element.collectionDetailImagePath)
    //  });

     this.editImages = res.data.collectionImage;
     console.log(res.data.isFeatured);
   })
  }
  /** Remove Duplicate products */
 getUniqueListBy(arr:any, key:any) {
    return [...new Map(arr.map((item:any) => [item[key], item])).values()]
}

  get f() { return this.collectionForm['controls']; }

  uploadImage(event: any) {
    //this.image = event.target.files[0];
    
      let images = event.target.files;
      
      for (var i = 0; i < images.length; i++) {
          this.images.push(images[i]);
      }
      console.log(images)
      if(this.collectionID){
       this.uploadImages(this.collectionID);
      }else{
        this.base(event)
      }

     
  }
    /** confirmation Popup  */
    openModal(template: TemplateRef<any>) {
      this.formValidations(template);
    }
   /** close popup  */
   /** from validations */
   formValidations(template:any){
    this.submitted = true;
    
    if(this.collectionNewName){
      this.collectionForm.value.collectionName = this.collectionNewName;
    }
    if(this.collectionForm.value.productId.length == 0){
      this.collectionForm.value.productId = "";
    }
    if(this.collectionForm.value.recipeId.length == 0){
     this.collectionForm.value.recipeId = "";
   }
    if(!this.collectionForm.value.collectionName){
      this.collectionError = true;
      if(!this.collectionForm.value.productId && !this.collectionForm.value.recipeId){
        this.collectionProductError = true;
        return
      }else{
        this.collectionProductError = false;
      }
      this.afterErrorChecked();
      return
    }
    if(this.editImages){
      if(this.croppedImage){
        this.collecioncroppedImage = false
      }
      
    }else{
      if(this.croppedImage == ''){
        this.collecioncroppedImage = true
        this.afterErrorChecked();
        return
      }
    }
    if(!this.collectionForm.value.productId && !this.collectionForm.value.recipeId){
      this.collectionProductError = true;
      this.afterErrorChecked();
      return
    }else{
      this.collectionProductError = false;
    }
   
   if(this.collectionForm.value.productId){
    this.getProductIds(this.collectionForm.value.productId);
   }
   if(this.collectionForm.value.recipeId){
    this.getRecipeIds(this.collectionForm.value.recipeId);
   }
   if(this.collectionForm.value.categoryId){
     this.getCategoriesId(this.collectionForm.value.categoryId);
   }
   if(this.collectionForm.value.subCategoryId){
    this.getSubCategoriesId(this.collectionForm.value.subCategoryId);
  }

   if(this.croppedImage){
      //this.baseSixtyFourImage.push(this.croppedImage);
      this.images.push(this.imgCropped);
    }
    // stop here if form is invalid
    if (this.collectionForm.invalid) {
      this.afterErrorChecked();
        return;
    }
    this.modalRef = this.modalService.show(template);
    
    
   }
   
  /** update and edit collection */
  submit(){
    let that = this;
    this.modalRef.hide();
    this.isLoaderImage = true;
    if(this.collectionID){
      this.collectionForm.value.collectionId = this.collectionID;
      this.collectionService.updateCollection(this.collectionForm.value).subscribe(res=>{
        if(res.success){
          //this.isLoaderImage = false;
          console.log(res);
          this.uploadImages(this.collectionID);
          // this.showImages = res.data;
          setTimeout(function () {
            that.toastr.success(res.message);
          }, 800);
           
           
        }else{
          this.toastr.success(res.message);
        }
      })
    }else{
      this.collectionService.addCollection(this.collectionForm.value).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
          console.log(res);
          this.uploadImages(res.data);
          // this.showImages = res.data;
          setTimeout(function () {
            that.toastr.success(res.message);
          }, 800);
        }else{
          this.toastr.success(res.message);
        }
      })
    }
    

  }
/** upload images with object */
  uploadImages(collectionId:any){
    console.log(this.images);
    let formData = new FormData();

   
    formData.append('collectionId', collectionId);
    if(this.collectionID){
      formData.append('collectionImage', this.editImages);
      console.log(this.imgCropped)
      formData.append('uploadedCollectionImage', this.imgCropped);
      this.images = [];
      this.collectionService.updateCollectionImages(formData).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
           //this.toastr.success(res.message);
        }
        this.zone.run(()=>{
          this.getCollectionDataWithId(this.collectionID);
          this.router.navigate(["/collections"]);
        })
      })
    }else{
      this.images.forEach((file:any) => {
          formData.append('collectionImage', file);
      });
      this.images = [];
      this.collectionService.uploadCollectionImages(formData).subscribe(res=>{
        this.isLoaderImage = false;
        this.zone.run(()=>{
          this.router.navigate(["/collections"]);
        })
      })
    }
    
  }

  /** edit Single image with imagesid */

  singleImageUpdate(event: any,data:any){
    this.singleImage = event.target.files[0];
    console.log(data)
    let formData = new FormData();
    formData.append('collectionDetailImageId', data.collectionDetailImageId);
    formData.append('collectionDetailImagePath', data.collectionDetailImagePath);
    formData.append('collectionId', data.collectionId);
    formData.append('uploadedCollectionImage', this.singleImage);
    this.collectionService.updateCollectionSingleImage(formData).subscribe(res=>{
      if(res.success){
        this.toastr.success(res.message);
     }
     this.zone.run(()=>{
       this.getCollectionDataWithId(this.collectionID);
     })
    })
    
  }
  getDeleteID(data:any){
    this.collectionDetailImageId = data.collectionDetailImageId
  }
  /** Delete Single image with imagesid */
  deleteSingleImage(){
    this.collectionService.deleteSingleImage(this.collectionDetailImageId).subscribe(res=>{
      if(res.success){
        this.toastr.success(res.message);
     }
     this.zone.run(()=>{
       this.getCollectionDataWithId(this.collectionID);
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
  console.log(this.allProducts)
 }

   /** Get All Categories */

   allCategoriesList(){
    this.categoryService.getAllcategories().subscribe(res=>{
      this.allCategories = res.items.filter(function(e:any) {
        return e.categoryId != null;
      });
      console.log(this.allCategories)
      // res.items.forEach((element:any,index:any )=> {
      //   this.catItem = element.categoryId;
      //   if( element.categoryId){
      //     this.catIds.push({categoryId: element.categoryId})
      //   }
        
     //});
    })
  }
/**Search Categories */
selectCategoryEvent(event:any){
  this.catIds = [];
  let isDisabled: boolean = false;
  this.catIds.push({categoryId: event.categoryId})
  console.log(this.catIds);
  const products = [];
  const searchString = event.categoryId;
/** This is only for one field */
// const serchProduct = this.searchString.transform('categoryId',this.allProducts,searchString);
// serchProduct.forEach((element:any) => {
//   isDisabled = false;
//   if(element.productDescription){
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
// this.searchProducts = this.productsName.filter(function(e) {
//   return e.productDescription !== '';
// });
// console.log(this.searchProducts)

 this.getListRecipes();
 this.subCategories();
 this.collectionForm.patchValue({
  recipeId: []
 });
}
/** Select All categoris */
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
  this.collectionChooseProduct = true;
  this.collectionChooseRecipe = false;
  this.collectionProductOr = false;
  this.classProduct = "12";
  this.collectionProductError = false;
}
onSelectAllProducts(item:any){
  this.collectionChooseProduct = true;
  this.collectionChooseRecipe = false;
  this.collectionProductOr = false;
  this.classProduct = "12";
  this.collectionProductError = false;
}

DropProduct(event:any){
  const data = this.collectionForm['controls']['productId'].value;
  if(data.length == 0){
    this.collectionChooseProduct = false;
  this.collectionChooseRecipe = false;
  this.collectionProductOr = true;
  this.classProduct = "4";
  }

}
onDeSelectAllProducts(event:any){
  const data = event;
  if(data.length == 0){
    this.collectionChooseProduct = false;
    this.collectionChooseRecipe = false;
    this.collectionProductOr = true;
    this.classProduct = "4";
  }
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
  this.collectionChooseProduct = false;
  this.collectionChooseRecipe = true;
  this.collectionProductOr = false;
  this.classProduct = "12";
  this.collectionProductError = false;
  this.clearData();
}

clearData(){
  this.collectionForm.patchValue({
    categoryId: '',
    subCategoryId: '',
    productId: ''
  })
  this.subCategoryNames = [];
  this.searchProducts = [];
}

onSelectAllRecipe(item:any){
  this.collectionChooseProduct = false;
  this.collectionChooseRecipe = true;
  this.collectionProductOr = false;
  this.classProduct = "12";
}
DropRecipe(item:any){
  const data = this.collectionForm['controls']['recipeId'].value;
  if(data.length == 0){
    this.collectionChooseProduct = false;
    this.collectionChooseRecipe = false;
    this.collectionProductOr = true;
    this.classProduct = "4";
    
  }
}
onDeSelectAllRecipe(item:any){
  const data = item;
  if(data.length == 0){
    this.collectionChooseProduct = false;
    this.collectionChooseRecipe = false;
    this.collectionProductOr = true;
    this.classProduct = "4";
  }
}
/** Change Colletions Type */
changecollectionName(event:any){
  if(event.target.value){
    this.collectionName = true;
    this.collectionOr = false;
    this.collectionNew = false;
    this.collectionError = false;
  }else{
    this.collectionName = false;
    this.collectionOr = true;
    this.collectionNew = false;
    this.collectionError = false;
  }
  this.clearData();
}
/** Add new Collections type */
newcollectionName(event:any){
  console.log(event.target.value);
  if(event.target.value){
    this.collectionNewName = event.target.value;
    this.collectionName = false;
    this.collectionNew = true;
    this.collectionOr = false;
    this.collectionError = false;
  }else{
    this.collectionOr = true;
    this.collectionNew = false;
    this.collectionName = false;
  }
}
/** Get string product Ids */

getProductIds(data:any){
  this.collectionProductIDs = [];
  data.forEach((element:any) => {
    this.collectionProductIDs.push(element.productId)
  });
  this.collectionForm.value.productId = this.collectionProductIDs.join(',');
}
/** Get Recipe Ids */
getRecipeIds(data:any){
  data.forEach((element:any) => {
    this.collectionRecipesID.push(element.recipeId)
  });
  this.collectionForm.value.recipeId = this.collectionRecipesID.join(',');
}

/** Get Categories Ids */
getCategoriesId(data:any){
  
    data.forEach((element:any) => {
      if(element?.categoryId){
        this.collectionCategoriesID.push(element.categoryId)
      }else{
        this.collectionCategoriesID.push(element)
      }

      
    });
    console.log(this.collectionCategoriesID)
    this.collectionForm.value.categoryId = this.collectionCategoriesID.join(',');
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
/** Get Sub categories  Ids */
getSubCategoriesId(data:any){
  
  data.forEach((element:any) => {
    if(element?.subCategoryId){
      this.collectionSubCategoryId.push(element.subCategoryId)
    }else{
      this.collectionSubCategoryId.push(element)
    }

    
  });
  this.collectionForm.value.subCategoryId = this.collectionSubCategoryId.join(',');
}
/** getProductsWith categories id */

getProductsWithId(ID:any){
  ID.forEach((element:any) => {
    this.catIds.push({categoryId: element})
  });
  //
  console.log(this.catIds);
  const products = [];
  //const searchString = event.categoryId;
/** This is only for one field */
this.catIds.forEach((res:any)=>{
const serchProduct = this.searchString.transform('categoryId',this.allProducts,res.categoryId);
serchProduct.forEach((element:any) => {
  let isDisabled: boolean = false;
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
console.log(this.searchProducts)
 this.getListRecipes();
}
/** Get All Collecions */
getAllCollections(){
  this.collectionService.getAllCollection(1,10000).subscribe(res=>{
    
    const data = this.getUniqueListBy(res.items,'collectionName');
    this.collections = data;
  })
}


/** file to convert base 64 Url*/
base(event: any) {
  const that = this
  let images = event.target.files;
      
      for (var i = 0; i < images.length; i++) {
      const reader = new FileReader();
    reader.readAsDataURL(images[i]);
    reader.onload = () => {
     this.baseSixtyFourImage.push(reader.result)
    };
      }
  this.showImages = true;
}

 /** Demo croper image */
 fileChangeEvent(event: any): void {
  this.collecioncroppedImage = false;
  if (this.imageType.includes(event.target.files[0].type)) {
    if (event.target.files[0].size / 1024 / 1024 < 2) {
      this.imagesLimitOrType = "";
      this.imageChangedEvent = event;
      if(this.croppedImage){
        this.baseSixtyFourImage.push(this.croppedImage);
        this.images.push(this.imgCropped);
      }
    }else{
      this.imagesLimitOrType = "Image Size Should Be Less Than 2 Mb";
      this.croppedImage = "";
     }
  }else{
    this.imagesLimitOrType = "Invalid File Type";
    this.croppedImage = "";
  }
  
  
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

this.imgCropped = new File([u8arr], filename, {type:mime});

}
afterErrorChecked() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
