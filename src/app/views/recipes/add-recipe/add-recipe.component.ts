import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ingredient, nutrition,ingredientToSale } from 'src/app/_interfaces/recipesAddEdit.model';
import { ProductService } from 'src/app/_services/product.service';
import { RecipeService } from 'src/app/_services/recipe.service';
import { environment } from 'src/environments/environment';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  
  modalRef!: BsModalRef;
  recipeForm!: FormGroup;
  ingredientForm!: FormGroup;
  ingredientToSaleForm!: FormGroup;
  nutritionsForm!: FormGroup;
  recipeID: any = '';
  submitted: any;
  submittedd: any;
  submitToSale: any;
  submitToNutrition: any;
  chooseProduct: any = false;
  enterProductName: any = false;
  ingredient: ingredient = new ingredient();
  nutrition: nutrition = new nutrition();
  ingredientToSale: ingredientToSale = new ingredientToSale();
  ingredients: any = [];
  ingredientsToSale: any = [];
  productsName: Array<any> = [];
  singleItem: any;
  images:any = [];
  getSingleIngredient: any;
  getSingleInToSale: any;
  getSingleText:any;
  getSingleNutrition: any;
  selectIngredientOption:boolean = true;
  imagePath: string = environment.imagePath;
  title:any = 'Add New Recipe';
  buttonTitle = 'save';
  singleImage: any;
  recipeDetailImageId: any;
  nutritions:any;
  nutritionList: any = [];

  
  showImages: boolean = false;
  /** Popup Boolean */
   inTosale:boolean = true;
   inToShow:boolean = true;
   nutToShow: boolean = true;

  /** Crop image */
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imgCropped:any;
  baseSixtyFourImage:Array<any> = [];
  showTitle: any ;
  maxDate = new Date();
  minDate = new Date();
  recipeImageShowError = false;
  /** Is Additional Information */
  isCategory: boolean = true;
  isServings: boolean = true;
  isPrepTime: boolean = true;
  isCookTime: boolean = true;
  isCalories: boolean = true;

  isLoaderImage: boolean = false
  imagesLimitOrType: any;
  imageType: Array<string> = ['image/jpg', 'image/jpeg', 'image/png']
  /** error messages */
  nutritionErrorMessage: any;
  intToSaleErrorMessage: any;
  intToShowErrorMessage: any;

  productSalePrice: any;
  productavailableQuantity: any;
  SingleSelectionDropdownSettings = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService,
    private recipeService: RecipeService,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllProductsName();
    this.useValidations();
    this.activatedRoute.params.subscribe((param: Params) => {
        this.recipeID = param['id'];
        if(this.recipeID){
          this.title = "Edit New Recipe"
          this.buttonTitle = "update"
        }
        this.getRecipeDataWithId(this.recipeID);
        console.log(this.recipeID)
    });
    this.SingleSelectionDropdownSettings = {
      singleSelection: true,
      idField: 'productId',
      textField: 'productDescription',
      allowSearchFilter: true
    };
  }

  
  
  /** Form Validations */

  useValidations(){
    this.recipeForm = this.formBuilder.group({
      recipeTitle: ['', [Validators.required,this.noWhitespaceValidator, Validators.maxLength(80)]],
      recipeDescription: ['', [Validators.required,this.noWhitespaceValidator]],
      difficultyLevel: ['', [Validators.required]],
      recipeDate: ['', [Validators.required]],
      preparetime: ['',[Validators.required,Validators.maxLength(20)]],
      keyIngredients: ['', [Validators.required,Validators.required,,this.noWhitespaceValidator]],
      topTips: ['', [Validators.required,this.noWhitespaceValidator]],
      category: ['',[Validators.maxLength(50)]],
      serving: ['' ,[Validators.maxLength(20)]],
      cookingTime: ['',[Validators.maxLength(20)]],
      calories: ['',[Validators.maxLength(50)]],
      categoryShow: [''],
      caloriesTimeShow: [''],
      servingShow: [''],
      preparetimeShow: [''],
      cookingTimeShow: [''],
      recipeNote: ['', [Validators.required,this.noWhitespaceValidator]],
      videoUrl: [''],
      otherInformation: ['', [Validators.required,this.noWhitespaceValidator]],
      authorName: ['', [Validators.required,this.noWhitespaceValidator,Validators.maxLength(50)]],
      directions: ['', [Validators.required,this.noWhitespaceValidator]],
      recipeImage: [''],
      ingredientToSale: [''],
      ingredientToShow: [''],
      nutrition: [''],
      nutritionCalories: [''],
      nutritionCarbs: [''],
      nutritionProtein: [''],
      nutritionFat: [''],
    });
    this.ingredientForm = this.formBuilder.group({
      productId: [''],
      ingredientName: ['', [Validators.required ,this.noWhitespaceValidator]],
      quantity: ['', [Validators.required,Validators.min(1)]],
      unit: ['', [Validators.required,this.noWhitespaceValidator]],
    })
    this.ingredientToSaleForm = this.formBuilder.group({
      productId: [''],
      ingredientName: [''],
      minimumOrder: ['', [Validators.required,Validators.min(1)]],
    })
    this.nutritionsForm = this.formBuilder.group({
      nutritionType: ['',[Validators.required ,this.noWhitespaceValidator]],
      quantity: ['', [Validators.required,Validators.min(1)]],
      unit: ['', [Validators.required,this.noWhitespaceValidator]],
    })
  }


  /** Get Data With ID */

  getRecipeDataWithId(recipeID: any){
    let resData:any;
    this.recipeService.getSingleRecipe(recipeID).subscribe(res=>{
      console.log( this.datePipe.transform(res.data.recipeDate,'MMMM dd YYYY, h:mm:ss a'));
      this.recipeForm.patchValue(res.data,{onlySelf: true})
      this.recipeForm.patchValue({preparetime: res.data.preparetime.replace(" min",""),cookingTime: res.data.cookingTime.replace(" min",""),serving: res.data.serving.replace(" min","")})
      const defficulty = res.data.difficultyLevel.toString();
      this.recipeForm.patchValue({nutritionCalories: res.data.nutritionList[0]?.quantity,
                                  nutritionCarbs: res.data.nutritionList[1]?.quantity,
                                  nutritionProtein: res.data.nutritionList[2]?.quantity,
                                  nutritionFat: res.data.nutritionList[3]?.quantity,
                                  difficultyLevel: defficulty,
                                  recipeDate:  this.datePipe.transform(res.data.recipeDate,'yyyy-MM-dd HH:mm:ss')});

      this.ingredients = res.data.ingredientToShow;
      this.images = res.data.recipeDetailImageList;
      this.nutritionList = res.data.nutritionList;
      this.ingredientsToSale = res.data.ingredientToSale;

      if(this.recipeForm.value.category == null || this.recipeForm.value.category == ""){
       this.showHideAdditionalInfromations(true,'Category');
       this.recipeForm.patchValue({categoryShow: true})
      }
      if(this.recipeForm.value.serving == null || this.recipeForm.value.serving == ""){
        this.showHideAdditionalInfromations(true,'Serving');
        this.recipeForm.patchValue({servingShow: true})
      }
      if(this.recipeForm.value.cookingTime == null || this.recipeForm.value.cookingTime == ""){
        this.showHideAdditionalInfromations(true,'Cook Time');
        this.recipeForm.patchValue({cookingTimeShow: true})
      }
      if(this.recipeForm.value.preparetime == null || this.recipeForm.value.preparetime == ""){
        this.showHideAdditionalInfromations(true,'Prep Time');
        this.recipeForm.patchValue({preparetimeShow: true})
      }
      if(this.recipeForm.value.calories == null || this.recipeForm.value.calories == ""){
        this.showHideAdditionalInfromations(true,'Calories');
        this.recipeForm.patchValue({caloriesTimeShow: true})
      }
    })
  }

  get f() { return this.recipeForm['controls']; }
  get in() { return this.ingredientForm['controls']; }
  get inToSale() {return this.ingredientToSaleForm['controls']; }
  get n() {return this.nutritionsForm['controls']; }
  
   /** confirmation Popup  */
   openModal(template: TemplateRef<any>) {
    this.formValidations(template);
  }
 /** close popup  */
 /** from validations */
 formValidations(template:any){
  this.submitted = true;
    const intBannerId = parseInt(this.recipeForm.value.difficultyLevel);
    this.recipeForm.value.difficultyLevel = intBannerId;
   console.log(this.recipeForm.value);
    // stop here if form is invalid
    if (this.recipeForm.invalid) {
      this.afterErrorChecked();
        return;
    }
   // console.log(this.images)
    if(this.croppedImage == "" && this.images.length == 0){
      this.recipeImageShowError = true;
      this.afterErrorChecked();
      return
    }
    const formData = new FormData();
     
    //  if(this.nutritionList.length == 0){
    //    this.nutritionErrorMessage = "Nutritions is required";
    //    this.afterErrorChecked();
    //    return
    //  }else{
    //    this.nutritionErrorMessage = "";
    //  }
     if(this.ingredients.length == 0){
      this.intToShowErrorMessage = "Ingredients to show is required";
      this.afterErrorChecked();

      return
    }else{
      this.intToShowErrorMessage = "";
    }
    if(this.ingredientsToSale.length == 0){
      this.intToSaleErrorMessage = "Ingredients to sale is required";
      this.afterErrorChecked();

      return
    }else{
      this.intToSaleErrorMessage = "";
    }
     this.recipeForm.value.nutrition = this.nutritionList;
     this.recipeForm.value.ingredientToShow = this.ingredients;
     this.recipeForm.value.ingredientToSale = this.ingredientsToSale;
     if(this.croppedImage){
      this.images.push(this.imgCropped);
    }
    this.recipeForm.value.preparetime = this.recipeForm.value.preparetime+" min";
    if(this.recipeForm.value.cookingTime){
      this.recipeForm.value.cookingTime = this.recipeForm.value.cookingTime+" min";
    }
    if(this.recipeForm.value.serving){
      this.recipeForm.value.serving = this.recipeForm.value.serving+" unit";
    }
    this.modalRef = this.modalService.show(template);

 }
  onSubmit() {
    this.modalRef.hide();
    this.isLoaderImage = true;
    if(this.recipeID){
      this.recipeForm.value.recipeId = this.recipeID;
      console.log(this.recipeID,'recipeID')

      this.recipeService.updateRecipe(this.recipeForm.value).subscribe(res=>{
        if(res.success){
          if(this.croppedImage){
            this.uploadRecipeImages(this.recipeID);
          }else{
            this.zone.run(()=>{
              this.router.navigate(["/recipes"]);
            })
          }
          
          this.toastr.success(res.message);
        }else{
          this.toastr.success(res.message);
        }
      });

    }else{

      this.recipeService.addRecipe(this.recipeForm.value).subscribe(res=>{
        if(res.success){
          this.uploadRecipeImages(res.data);
          this.toastr.success(res.message);
        }else{
          this.toastr.success(res.message);
        }
      })
    }
    
    
  }
/** Check yes no for serch products */
  productOptions(event:any){
   let val = event.target.value
   if(val == 'yes'){
     this.chooseProduct = true;
     this.enterProductName = false;
   }else{
     this.chooseProduct = false;
     this.enterProductName = true;
   }
  }
  /** For ingredient Data */
  ingredientSubmit() {
    this.submittedd = true;
    this.intToShowErrorMessage = "";
    // stop here if form is invalid
    if (this.ingredientForm.invalid) {
        return;
    }
    if(this.ingredientForm.value.ingredientName){
      this.ingredient.ingredientName = this.ingredientForm.value.ingredientName;
      this.ingredient.productId = 0;
    }
   
    this.ingredient.quantity = this.ingredientForm.value.quantity;
    this.ingredient.unit = this.ingredientForm.value.unit;
    
    if((this.getSingleIngredient || this.getSingleIngredient == 0) && this.getSingleIngredient !== '' ){
        
        this.ingredients[this.getSingleIngredient].productId = this.ingredient.productId;
        this.ingredients[this.getSingleIngredient].ingredientName = this.ingredient.ingredientName;
        this.ingredients[this.getSingleIngredient].quantity = this.ingredient.quantity;
        this.ingredients[this.getSingleIngredient].unit = this.ingredient.unit;
        console.log(this.ingredients[this.getSingleIngredient])
        this.inToShow = false;
    }else{
      this.ingredients.push({productId: this.ingredient.productId, ingredientName:this.ingredient.ingredientName,quantity:this.ingredient.quantity,unit:this.ingredient.unit});
      this.ingredientForm.reset();
      this.inToShow = false;
       
    }
    
    
  }

  /** For ingredient To Sale Data */
  ingredientToSaleSubmit() {
    this.submitToSale = true;
   console.log(this.ingredientToSaleForm.value);
   this.intToSaleErrorMessage = "";
    // stop here if form is invalid
    if (this.ingredientToSaleForm.invalid) {
        return;
    }

   
    this.ingredientToSale.minimumOrder = this.ingredientToSaleForm.value.minimumOrder;
    console.log(this.getSingleInToSale)
    if((this.getSingleInToSale || this.getSingleInToSale == 0) && (this.getSingleInToSale != '' || this.getSingleInToSale != undefined ) ){
        
        this.ingredientsToSale[this.getSingleInToSale].productId = this.ingredientToSale.productId;
        this.ingredientsToSale[this.getSingleInToSale].ingredientName = this.ingredientToSale.ingredientName;
        this.ingredientsToSale[this.getSingleInToSale].minimumOrder = this.ingredientToSale.minimumOrder;
        
        console.log(this.ingredientsToSale[this.getSingleInToSale])
        this.inTosale = false;
    }else{
      this.ingredientsToSale.push({productId: this.ingredientToSale.productId, ingredientName:this.ingredientToSale.ingredientName,minimumOrder:this.ingredientToSale.minimumOrder});
      console.log(this.ingredientsToSale);
      this.ingredientToSaleForm.reset();
      this.inTosale = false;
    }
    
  }

    /** For ingredient To Sale Data */
    nutritionsSubmit() {
      this.submitToNutrition = true;
      this.nutritionErrorMessage = "";
      // stop here if form is invalid
      if (this.nutritionsForm.invalid) {
          return;
      }
      this.nutrition.nutritionType = this.nutritionsForm.value.nutritionType;
      this.nutrition.quantity = this.nutritionsForm.value.quantity;
      this.nutrition.unit = this.nutritionsForm.value.unit;
    
    if((this.getSingleNutrition || this.getSingleNutrition == 0) && (this.getSingleNutrition != '' || this.getSingleNutrition != undefined )){
        this.nutritionList[this.getSingleNutrition].nutritionType = this.nutrition.nutritionType;
        this.nutritionList[this.getSingleNutrition].quantity = this.nutrition.quantity;
        this.nutritionList[this.getSingleNutrition].unit = this.nutrition.unit;
        console.log(this.nutritionList[this.getSingleNutrition])
        this.nutToShow = false;
    }else{
      this.nutritionList.push({nutritionType: this.nutrition.nutritionType, quantity:this.nutrition.quantity,unit:this.nutrition.unit});
      this.nutritionsForm.reset();
      this.nutToShow = false;
    }
      
      
    }
  /** Get products name or product ID */
  getAllProductsName(){
  //  this.productService.getProducts(1,1000).subscribe(res=>{
  //    res.items.forEach((element:any,index:any )=> {
  //       this.singleItem = element.productDescription;
  //       if(element.productId && element.productDescription){
  //         this.productsName.push({productId: element.productId,productDescription: element.productDescription+"_"+element.productId})
  //       }
       
  //    });
  //  })
  let isDisabled: boolean = false;
  let prodData:any = this.productService.getAllProdData();
  let allProducts = JSON.parse(prodData);
  allProducts.forEach((element:any,index:any )=> {
          this.singleItem = element.productDescription;
          if(element.productId && element.productDescription){
            isDisabled = false;
            this.productSalePrice = element.salesPrice;
            this.productavailableQuantity = element.availableQuantity;
            if(this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined){
              isDisabled = true;
            }else if(this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined){
              isDisabled = true;
            }
            this.productsName.push({productId: element.productId,productDescription: element.productDescription+"_"+element.productId,isDisabled: isDisabled})
          }
         
       });
   console.log(this.productsName);
  }
/** select search product name and product id */
  selectEvent(event:any){
    this.ingredientToSale.productId = event.productId;
    this.ingredientToSale.ingredientName = event.productDescription.split('_')[0];
    return this.ingredientToSale;
  }

  /** Get Images */
  uploadImage(event: any) {
    let images = event.target.files;
    console.log(images)
    for (var i = 0; i < images.length; i++) {
        this.images.push(images[i]);
    }
    if(this.recipeID){
      this.uploadRecipeImages(this.recipeID)
    }else{
      this.base(event);
    }
   console.log(this.images)
   this.recipeImageShowError = false;
  }

  uploadRecipeImages(recipeId:any){
    let that = this;
    let formData = new FormData();
    this.images.forEach((file:any) => {
          formData.append('recipeImage', file);
      });
    formData.append('recipeId', recipeId);
    if(this.recipeID){
      this.images = [];
      this.recipeService.updateRecipeImages(formData).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
          //this.toastr.success(res.message);
          this.zone.run(()=>{
            this.getRecipeDataWithId(this.recipeID);
            this.router.navigate(["/recipes"]);
          })
        }else{
           this.toastr.success(res.message);
        }
        
      })
    }else{
      this.images = [];
      this.recipeService.uploadRecipeImage(formData).subscribe(res=>{
        if(res.success){
          this.zone.run(()=>{
            this.router.navigate(["/recipes"]);
          })
          
          // this.toastr.success(res.message);
        }else{
          // this.toastr.success(res.message);
        }
      })
    }
    
  }
/** get ingredient delete id */
  deleteObject(str:any,id:any){
    this.getSingleText = str;
    console.log(this.getSingleText);
    if(str == 'ingredientToSale'){
      this.getSingleInToSale = id;
    }else if(str == 'ingredient'){
      this.getSingleIngredient = id;
    }else if(str == 'nutrition'){
      this.getSingleNutrition = id;
    }
   
  }
/** Delete Ingredient Object */

deleteIngredientObject(){
  if(this.getSingleText == 'ingredientToSale'){
   this.ingredientsToSale.forEach((element:any,index:any) => {
    if(index==this.getSingleInToSale) this.ingredientsToSale.splice(index,1);
   });
  }else if(this.getSingleText == 'ingredient'){
    this.ingredients.forEach((element:any,index:any)=>{
      if(index==this.getSingleIngredient) this.ingredients.splice(index,1);
   });
  }else if(this.getSingleText == 'nutrition'){
    console.log(this.nutritionList)
    console.log(this.getSingleNutrition)
    this.nutritionList.forEach((element:any,index:any)=>{
      if(index==this.getSingleNutrition) this.nutritionList.splice(index,1);
   });
   
  }
  
  console.log(this.ingredients)
}

/** get Single Ingredient Id */

getSingleIngredientId(ID: any){
  this.showTitle = 'Edit';
  this.inToShow = true;
  this.selectIngredientOption = false
  this.getSingleIngredient = ID;
  this.ingredients.forEach((element:any,index:any)=>{
    if(index==ID) this.ingredientForm.patchValue(element)
 });
}
 
/** single Ingredient To Sale */
getSingleIngredientToSale(ID: any){
  this.showTitle = 'Edit';
  this.inTosale = true;
  this.selectIngredientOption = false
  this.getSingleInToSale= ID;
  let data: Array<any> = [];
  console.log(this.getSingleInToSale);
  this.ingredientsToSale.forEach((element:any,index:any)=>{
    if(index==ID) 
    data.push({productId: element.productId,productDescription: element.ingredientName+"_"+element.productId })
    this.ingredientToSaleForm.patchValue({productId: data,minimumOrder:element.minimumOrder})
 });
}
/** Edit nutrition data */
getSingleNutritionID(ID: any){
  this.showTitle = 'Edit';
  this.nutToShow = true;
  this.getSingleNutrition= ID;
  console.log(this.getSingleNutrition);
  this.nutritionList.forEach((element:any,index:any)=>{
    if(index==ID) this.nutritionsForm.patchValue(element)
 });
}
  /** edit Single image with images id */

  singleImageUpdate(event: any,data:any){
    this.singleImage = event.target.files[0];
    let formData = new FormData();
    formData.append('recipeDetailImageId', data.recipeDetailImageId);
    formData.append('recipeDetailImagePath', data.recipeDetailImagePath);
    formData.append('recipeId', data.recipeId);
    formData.append('uploadedRecipeImage', this.singleImage);
    this.recipeService.updateRecipeSingleImage(formData).subscribe(res=>{
      console.log(res)
      if(res.success){
        this.toastr.success(res.message);
     }
     this.zone.run(()=>{
       this.getRecipeDataWithId(this.recipeID);
     })
    })
    
  }
  getDeleteID(data:any){
    console.log(data)
    this.recipeDetailImageId = data.recipeDetailImageId
  }
  /** Delete Single image with imagesid */
  deleteSingleImage(){
    this.recipeService.deleteSingleImage(this.recipeDetailImageId).subscribe(res=>{
      if(res.success){
        this.toastr.success(res.message);
     }
     this.zone.run(()=>{
       this.getRecipeDataWithId(this.recipeID);
     })
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

  /**  croper image */
 fileChangeEvent(event: any): void {
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
  // if(this.croppedImage){
  //   this.baseSixtyFourImage.push(this.croppedImage);
  //   this.images.push(this.imgCropped);
  // }
  
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
this.recipeImageShowError = false;
}

/** Remove Base 64 image object */
deleteBasesixty(data:any){
  this.baseSixtyFourImage.forEach((element:any,index)=>{
    if(element==data) this.baseSixtyFourImage.splice(index,1);
  })
}

/** First Empty sapce not allowed */
noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}
/** show popup */
openPopuop(title:any){
  this.showTitle = 'Add';
  console.log(title)
  if(title == 'ingredientToSale'){
    this.inTosale = true;
    if(this.getSingleInToSale || this.getSingleInToSale == 0){
      this.ingredientToSaleForm.reset();
      this.getSingleInToSale = "";
      console.log(this.getSingleInToSale)
     }
  }else if(title == 'ingredientToShow'){
    this.inToShow = true;
    if(this.getSingleIngredient || this.getSingleIngredient == 0){
      this.ingredientForm.reset();
      this.getSingleIngredient = "";
      console.log(this.getSingleIngredient)
     }
  }else if(title == 'nutrition'){
    this.nutToShow = true;
    if(this.getSingleNutrition || this.getSingleNutrition == 0 ){
      this.nutritionsForm.reset();
      this.getSingleNutrition = "";
      console.log(this.getSingleNutrition)
     }
  }
  
  
  
}

/** Show and Hide Additional Informations */

showHideAdditionalInfromations(event:any,type:any){
  let isAvilable = event.target?.checked;
  if(isAvilable == undefined){
    isAvilable = event;
  }
  switch (type) {
    case 'Category':
      if(isAvilable){
       this.isCategory = false
       this.recipeForm.patchValue({category: ''});
      }else{
        this.isCategory = true;
      }
      break;
    case 'Serving':
      if(isAvilable){
        this.isServings = false
        this.recipeForm.patchValue({serving: ''});
       }else{
         console.log('working')
         this.isServings = true;
       }
      break;
    case 'Prep Time':
      if(isAvilable){
        this.isPrepTime = false
        this.recipeForm.patchValue({preparetime: ''});
       }else{
         this.isPrepTime = true;
       }
      break;
    case 'Cook Time':
      if(isAvilable){
        this.isCookTime = false
        this.recipeForm.patchValue({cookingTime: ''});
       }else{
         this.isCookTime = true;
       }
      break;
    case 'Calories':
      if(isAvilable){
        this.isCalories = false
        this.recipeForm.patchValue({calories: ''});
       }else{
         this.isCalories = true;
       }
      break;
  }
}
afterErrorChecked() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
