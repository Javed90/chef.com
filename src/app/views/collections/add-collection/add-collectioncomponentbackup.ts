import { Component, NgZone, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit {

  collectionForm!: FormGroup;
  showImages:boolean = false;
  imagePath: string = environment.imagePath;
  image:any;
  submitted: boolean = false;
  images:any = [];
  collectionID: any;
  title:any = "Add New Collection";
  editImages:any = [];
  singleImage: any;
  collectionDetailImageId: any;
  /** Collection Type variables */
  collectionType: boolean = false;
  collectionNew: boolean = false;
  collectionOr: boolean = true;
  collectionError: boolean = false;
  collectionProductError:boolean = false;
  collectionProductIDs:Array<any>= [];
  collectionCategoriesID:Array<any> = [];
  collectionRecipesID:Array<any> = [];
  collectionChooseProduct: boolean = false;
  collectionChooseRecipe: boolean = false;
  collectionProductOr: boolean =  true;
  classProduct:any ="3";
  selectedRecipes:Array<any> = [];
  /** Multiselected Variables */

  productsName = [{productId: '',productDescription: ''}];
  catIds = [{categoryId: ''}];
  catItem: any;
  allCategories: any;
  dropdownList: any;
  selectedItems:any;
  dropdownSettings: any;
  allProducts:any = [];
  serchProducts:any = [];
  dropdownRecipeSettings:any;
  allRecipes: any;
  dropdownCategorySettings: any;
  productDescription:any = [];
  collections: any =[];
  

  /** Crop image */
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imgCropped:any;
  baseSixtyFourImage:Array<any> = [];

  constructor( private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private collectionService: CollectionService,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CommonCategoriesService,
    private recipeService: RecipeService,
    private serchString: SearchStringPipe ) { }

  ngOnInit(): void {
    console.log(this.baseSixtyFourImage)
    this.collectionForm = this.formBuilder.group({
      collectionImage: [''],
      newCollectionType: [''],
      collectionType: ['',],
      productId: [''],
      recipeId: [''],
      categoryId: ['']

    });
   // this.getListRecipes();
    this.activatedRoute.params.subscribe((param: Params) => {
      this.collectionID = param['id'];
      if(this.collectionID){
        this.title = "Edit New Collection"
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
    };
    this.dropdownRecipeSettings = {
      idField: 'recipeId',
      textField: 'recipeTitle',
    };
    this.dropdownCategorySettings = {
      idField: 'categoryId',
      textField: 'categoryId',
    }
  }
  /** Get Collection Detail with Id */
  getCollectionDataWithId(ID:any){
    const that = this
   this.collectionService.collectionDetail(ID).subscribe(res=>{
     //this.collectionForm.patchValue(res.data);
     this.getProductsWithId(res.data.categoryId.split(','));
     
      res.data.productId?.split(',').forEach((element:any) => {
        const serchProduct = this.serchString.transform('productId',this.productsName,element);
        serchProduct.forEach((element2:any) => {
          if(element == element2.productId){
            this.productDescription.push({productId:element2.productId,productDescription:element2.productDescription})
          }
        }) 
    });
    res.data.recipeId?.split(',').forEach((ele:any) => {

     const serchRecipes = this.serchString?.transform('recipeId',this.allRecipes,ele);
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
      this.classProduct = "8";
    }else{
      this.collectionChooseProduct = false;
      this.collectionChooseRecipe = true;
      this.collectionProductOr = false;
      this.classProduct = "8";
    }
 
    const data = this.getUniqueListBy(this.productDescription,'productId');
     this.collectionForm.patchValue({collectionType: res.data.collectionType,categoryId:res.data.categoryId.split(','),productId:data,recipeId:recipeData})
    //  res.data.collectionDetailImage.forEach((element:any)=> {
    //    this.images.push(element.collectionDetailImagePath)
    //  });

     this.editImages = res.data.collectionDetailImage;
     console.log(this.images);
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
  /** update and edit collection */
  submit(event:any){
    this.submitted = true;
    // stop here if form is invalid
    if (this.collectionForm.invalid) {
        return;
    }
    if(!this.collectionForm.value.collectionType && !this.collectionForm.value.newCollectionType){
      this.collectionError = true;
      return
    }
    if(!this.collectionForm.value.productId && !this.collectionForm.value.recipeId){
      this.collectionProductError = true;
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


    if(this.collectionID){
      this.collectionForm.value.collectionId = this.collectionID;
      this.collectionService.updateCollection(this.collectionForm.value).subscribe(res=>{
        if(res.success){
          console.log(res);
          //this.uploadImages(res.data);
          // this.showImages = res.data;
           this.toastr.success(res.message);
           this.zone.run(()=>{
            this.router.navigate(["/collections"]);
          })
        }else{
          this.toastr.success(res.message);
        }
      })
    }else{
      this.collectionService.addCollection(this.collectionForm.value).subscribe(res=>{
        if(res.success){
          console.log(res);
          this.uploadImages(res.data);
          // this.showImages = res.data;
           this.toastr.success(res.message);
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
    this.images.forEach((file:any) => {
          formData.append('collectionImage', file);
      });
    formData.append('collectionId', collectionId);
    if(this.collectionID){
      this.images = [];
      this.collectionService.updateCollectionImages(formData).subscribe(res=>{
        if(res.success){
           this.toastr.success(res.message);
        }
        this.zone.run(()=>{
          this.getCollectionDataWithId(this.collectionID);
        })
      })
    }else{
      this.images = [];
      this.collectionService.uploadCollectionImages(formData).subscribe(res=>{
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
  this.catIds.push({categoryId: event.categoryId})
  console.log(this.catIds);
  const products = [];
  const searchString = event.categoryId;
/** This is only for one field */
const serchProduct = this.serchString.transform('categoryId',this.allProducts,searchString);
serchProduct.forEach((element:any) => {
  if(element.productDescription){
    this.productsName.push({productId:element.productId,productDescription:element.productDescription})
  }
  
});
this.serchProducts = this.productsName.filter(function(e) {
  return e.productDescription !== '';
});
console.log(this.serchProducts)
 this.getListRecipes();
}
/** Select All categoris */
onSelectAllCategory(event:any){
this.serchProducts = this.allProducts;
this.getListRecipes();
}
/** Delete Select Categories */

DropDownClose(event:any){
this.catIds.forEach((element:any,index:any) => {
  if(element.categoryId == event.categoryId){
   this.catIds.splice(index,1)
  }
});
console.log(this.catIds);
 this.productsName = []
 this.catIds = this.catIds.filter(function(e) {
  return e.categoryId !== '';
});
 this.catIds.forEach((element:any)=>{
   if(element.categoryId != event.categoryId){
    const serchProduct = this.serchString.transform('categoryId',this.allProducts,element.categoryId);
    serchProduct.forEach((element:any) => {
      if(element.productDescription){
        this.productsName.push({productId:element.productId,productDescription:element.productDescription})
      }
      
    });
    this.serchProducts = this.productsName.filter(function(e) {
      return e.productDescription !== '';
    });
    console.log(this.serchProducts)
   }
 })

}
/** This  function use for products */
onItemSelect(item: any) {
  this.collectionChooseProduct = true;
  this.collectionChooseRecipe = false;
  this.collectionProductOr = false;
  this.classProduct = "8";
}
onSelectAllProducts(item:any){
  this.collectionChooseProduct = true;
  this.collectionChooseRecipe = false;
  this.collectionProductOr = false;
  this.classProduct = "8";
}

/** Get All Recipes */

getListRecipes(){
const data:any = this.recipeService.getAllRecipesData();
this.allRecipes = JSON.parse(data);
console.log(this.allRecipes);
}
onItemSelectRecipe(item: any){
  this.collectionChooseProduct = false;
  this.collectionChooseRecipe = true;
  this.collectionProductOr = false;
  this.classProduct = "8";
}
onSelectAllRecipe(item:any){
  this.collectionChooseProduct = false;
  this.collectionChooseRecipe = true;
  this.collectionProductOr = false;
  this.classProduct = "8";
}

/** Change Colletions Type */
changeCollectionType(event:any){
  if(event.target.value){
    this.collectionType = true;
    this.collectionOr = false;
    this.collectionNew = false;
    this.collectionError = false;
  }else{
    this.collectionType = false;
    this.collectionOr = true;
    this.collectionNew = false;
    this.collectionError = false;
  }
}
/** Add new Collections type */
newCollectionType(event:any){
  console.log(event.target.value);
  if(event.target.value){
    this.collectionType = false;
    this.collectionNew = true;
    this.collectionOr = false;
    this.collectionError = false;
  }else{
    this.collectionOr = true;
    this.collectionNew = false;
    this.collectionType = false;
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
const serchProduct = this.serchString.transform('categoryId',this.allProducts,res.categoryId);
serchProduct.forEach((element:any) => {
  if(element.productDescription){
    this.productsName.push({productId:element.productId,productDescription:element.productDescription})
  }
  
});
this.serchProducts = this.productsName.filter(function(e) {
  return e.productDescription !== '';
});
})
console.log(this.serchProducts)
 this.getListRecipes();
}
/** Get All Collecions */
getAllCollections(){
  this.collectionService.getAllCollection(1,10000).subscribe(res=>{
    
    const data = this.getUniqueListBy(res.items,'collectionType');
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
  this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
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

this.imgCropped = new File([u8arr], filename, {type:mime});

}
}
