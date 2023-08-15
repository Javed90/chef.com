import { Component, NgZone, OnInit, TemplateRef, AfterViewInit } from '@angular/core';
import { CouponService } from 'src/app/_services/coupon.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ProductService } from 'src/app/_services/product.service';
import { CommonCategoriesService } from 'src/app/_services/common-categories.service';
import { RecipeService } from 'src/app/_services/recipe.service';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { CollectionService } from 'src/app/_services/collection.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrls: ['./add-coupons.component.css']
})
export class AddCouponsComponent implements OnInit {
  modalRef!: BsModalRef;
  couponForm!: FormGroup;
  countryList: any;
  getCitiesList: any;
  submitted: boolean = false;
  showImages: boolean = false;
  baseSixtyFourImage: any;
  imgCropped: any;
  dropdownRecipeSettings: any;
  allRecipes: any;
  dropdownCategorySettings: any;
  dropdownSettings: any;
  freeProductsSettings: any;
  allProducts: any = [];
  dropdownCollectionsSettings: any;
  dropdownSubCategorySettings: any;
  allCollections: any = [];
  allCategories: any;
  isCheckCouponCode: boolean = false;
  isCheckCouponError: boolean = false;
  /** coupon Type variables */
  couponType: boolean = false;
  couponNew: boolean = false;
  couponOr: boolean = true;
  couponError: boolean = false;
  couponProductError: boolean = false;
  couponProductIDs: Array<any> = [];
  couponCategoriesID: Array<any> = [];
  couponSubCategoryId: Array<any> = [];
  couponCollectionsID: Array<any> = [];
  couponRecipesID: Array<any> = [];
  couponChooseProduct: boolean = false;
  couponChooseRecipe: boolean = false;
  couponChooseCollection: boolean = false;
  couponProductOr: boolean = true;
  couponCollectionOr: boolean = true;
  couponID: any;
  couponDiscountType: any;
  couponDiscountValue: boolean = false;
  classProduct: any = "3";
  selectedRecipes: Array<any> = [];
  searchProducts: any = [];
  catIds: Array<any> = [];
  productsName: Array<any> = [];
  couponCalculatePrice: Array<any> = [];
  title: any = "Add";
  buttonTitle = "save";
  couponDiscountPrice: number = 0;
  couponDiscountPlaceholder: any;
  discountValue: number = 0;
  discountValueError: any;
  maxDate = new Date();
  minDate = new Date();
  allFreeProducts: any;
  couponFreeProducts: boolean = false;
  /** Collections Products */
  collectionProducts: Array<any> = [];
  collectionDescription: any = [];
  /** Recipe Products */
  recipeProducts: Array<any> = [];
  freeProducts: Array<any> = [];
  couponObj: any;
  couponDetail: any;
  recipeIDData: any
  /**Products */
  productDescription: any = [];
  productDescription2: any = [];
  freeProductName: any;
  isLoaderImage: boolean = false

  productSalePrice: any;
  productavailableQuantity: any;

  minFromToDate: any;

  /** sub category variable */
  subCategoryList: Array<any> = [];
  subCategoriesNames: Array<any> = [];
  subCategoryNames: any;
  subCatId: Array<any> = [];
  constructor(private couponService: CouponService, private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CommonCategoriesService,
    private recipeService: RecipeService,
    private collectionService: CollectionService,
    private searchString: SearchStringPipe,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private datePipe: DatePipe,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.couponForm = this.formBuilder.group({
      couponCode: ['', [Validators.required]],
      couponToDate: ['', [Validators.required]],
      couponFromDate: ['', [Validators.required]],
      usageLimitPerUser: ['', [Validators.required, Validators.min(1)]],
      usageLimitDiscountCode: ['', [Validators.required, Validators.min(1)]],
      discountType: ['', [Validators.required]],
      categoryId: [''],
      subCategoryId: [''],
      productId: [''],
      recipeId: [''],
      collectionId: [''],
      discountAmount: [''],
      discountValue: [''],
      freeProducts: [''],
      isGlobal: ['']
    });
    this.getCountries();
    this.getListRecipes();
    this.allCouponList();
    this.multiselectedVariables();
    this.couponForm.valueChanges.subscribe(val => {
      localStorage.setItem("isFormChanged", JSON.stringify(true));
    });
  }
  /** Multi selected  Define Fields name */

  multiselectedVariables() {
    this.getAllProductsName();
    this.allCategoriesList();
    this.getFreeProducts();
    this.getListCollections();
    this.dropdownSettings = {
      idField: 'productId',
      textField: 'productDescription',
      allowSearchFilter: true
    };
    this.freeProductsSettings = {
      idField: 'productId',
    }
    this.dropdownRecipeSettings = {
      idField: 'recipeId',
      textField: 'recipeTitle',
      allowSearchFilter: true
    };
    this.dropdownCategorySettings = {
      idField: 'categoryId',
      textField: 'categoryId',
      allowSearchFilter: true,
      singleSelection: false,
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
    /** Get ID from url */
    this.activatedRoute.params.subscribe((param: Params) => {
      this.couponID = param['id'];
      if (this.couponID) {
        this.title = "Edit"
        this.buttonTitle = "update"
        this.getSingleCouponObject(this.couponID);
        this.getCouponDataWithId();
      }
    });
  }
  get f() { return this.couponForm['controls']; }
  getCountries() {
    this.couponService.getCountriesList().subscribe(res => {
      this.countryList = res.items;
    })
  }
  getCities(ID: any) {

    this.couponService.getCitiesList(ID.target.value).subscribe(res => {
      this.getCitiesList = res.items;
    })
  }

  /** Edit Coupon Data */
  getCouponDataWithId() {
    const that = this;
    let categories: any;
    //this.collectionForm.patchValue(this.couponDetail);
    if (this.couponDetail.isGlobal != true) {
      if (this.couponDetail.categoryId != "" || this.couponDetail.categoryId != null) {
        categories = this.couponDetail?.categoryId?.split(',');
        this.getProductsWithId(this.couponDetail.categoryId?.split(','));
        this.getSubCategoriesWithID(this.couponDetail.categoryId?.split(','))
      }

      /** Product Data set */
      this.couponDetail.productId?.split(',').forEach((element: any) => {
        const serchProduct = this.searchString.transform('productId', this.productsName, element);
        serchProduct.forEach((element2: any) => {
          if (element == element2.productId) {
            this.productDescription.push({ productId: element2.productId, productDescription: element2.productDescription })
          }
        })
      });
      const data = this.getUniqueListBy(this.productDescription, 'productId');
      if (this.couponDetail.productId) {
        this.calculateProductPrice(data, 'products')
      }
      /** buy One Get One Data set */
      this.couponDetail.freeProducts.forEach((element: any) => {
        this.allFreeProducts.forEach((element2: any) => {
          if (element.productId == element2.productId) {
            this.productDescription2.push({ productId: element2.productId, productDescription: element2.productDescription })
          }
        })
      });
      const data2: any = this.getUniqueListBy(this.productDescription2, 'productId');
      if (data2.length == 1) {
        this.freeProductName = data2[0].productDescription;
      }

      /** Collection Data set */
      this.couponDetail.collectionId?.split(',').forEach((element: any) => {
        this.allCollections.forEach((element2: any) => {
          if (element == element2.collectionId) {
            this.collectionDescription.push({ collectionId: element2.collectionId, collectionName: element2.collectionName })
          }
        })
      });
      const data3 = this.getUniqueListBy(this.collectionDescription, 'collectionId');
      if (this.couponDetail.collectionId) {
        this.collectionData(data3, 'multiple')
      }

      /** Recipe Data set */
      if (this.couponDetail.recipeId != "" && this.couponDetail.recipeId != null) {
        this.couponDetail.recipeId?.split(',').forEach((ele: any) => {

          const serchRecipes = this.searchString?.transform('recipeId', this.allRecipes, ele);
          serchRecipes.forEach((element2: any) => {
            if (ele == element2.recipeId) {
              this.selectedRecipes.push(element2)
            }
          })
        })
        this.recipeIDData = this.getUniqueListBy(this.selectedRecipes, 'recipeId');
        if (this.couponDetail.recipeId) {
          this.recipeData(this.recipeIDData, 'multiple')
        }
      }

      if (this.couponDetail.productId) {
        this.couponChooseProduct = true;
        this.couponChooseRecipe = false;
        this.couponProductOr = false;
        this.couponChooseCollection = false;
        this.couponCollectionOr = false;
        this.classProduct = "12";
      } else if (this.couponDetail.recipeId) {
        this.couponChooseProduct = false;
        this.couponChooseRecipe = true;
        this.couponProductOr = false;
        this.couponChooseCollection = false;
        this.couponCollectionOr = false;
        this.classProduct = "12";
      } else {
        this.couponChooseProduct = false;
        this.couponChooseRecipe = false;
        this.couponProductOr = false;
        this.couponChooseCollection = true;
        this.couponCollectionOr = false;
        this.classProduct = "12";
      }

      this.minFromToDate = this.couponDetail.couponFromDate;
      // this.couponForm.setValue({couponFromDate: this.couponDetail.couponFromDate})
      this.getDiscountType(this.couponDetail.discountType);
      this.discountValue = this.couponDetail.discountValue;
      this.couponForm.patchValue({
        productId: data,
        recipeId: this.recipeIDData,
        categoryId: categories,
        subCategoryId: this.couponDetail.subCategoryId?.split(','),
        couponCode: this.couponDetail.couponCode,
        collectionId: data3,
        discountAmount: this.couponDetail.discountAmount,
        discountType: this.couponDetail.discountType,
        couponToDate: this.couponDetail.couponToDate,
        couponFromDate: this.couponDetail.couponFromDate,
        usageLimitPerUser: this.couponDetail.usageLimitPerUser,
        usageLimitDiscountCode: this.couponDetail.usageLimitDiscountCode,
        freeProducts: data2,
        discountValue: this.couponDetail.discountValue
      })
    } else {
      this.couponForm.patchValue(this.couponDetail)
      this.getDiscountType(this.couponDetail.discountType);
    }



  }
  /** confirmation Popup  */
  openModal(template: TemplateRef<any>) {
    this.formValidations(template);
  }
  /** close popup  */
  /** from validations */
  formValidations(template: any) {
    this.couponForm.value.couponToDate = this.datePipe.transform(this.couponForm.value.couponToDate, 'yyyy-MM-dd');
    this.couponForm.value.couponFromDate = this.datePipe.transform(this.couponForm.value.couponFromDate, 'yyyy-MM-dd');

    this.submitted = true;
    // stop here if form is invalid
    if (this.couponForm.invalid) {
      this.afterErrorChecked()
      return;
    }
    if (this.couponDiscountPlaceholder == "Percent" || this.couponDiscountPlaceholder == "Fixed") {
      if (!this.couponForm.value.discountValue) {
        this.discountValueError = this.couponDiscountPlaceholder + " Discount Value Required";
        return;
      }
    } else {
      this.discountValueError = "";
    }
    let couponStatus = this.checkCouponCode(this.couponForm.value.couponCode);
    if (this.couponID) {
      if (this.couponDetail.couponCode == this.couponForm.value.couponCode) {
        this.isCheckCouponError = false;
      } else {
        if (couponStatus == true) {
          this.isCheckCouponError = true;
          this.isCheckCouponCode = false;
          this.afterErrorChecked()
          return;
        }
      }
    } else {
      if (couponStatus == true) {
        this.isCheckCouponError = true;
        this.isCheckCouponCode = false;
        this.afterErrorChecked()
        return;
      } else {
        this.isCheckCouponError = false;
      }
    }
    if (this.couponForm.value.isGlobal != true) {
      if (this.couponForm.value.recipeId == undefined || this.couponForm.value.recipeId == null || this.couponForm.value.recipeId?.length == 0) {
        this.couponForm.value.recipeId = "";
      }
      if (this.couponForm.value.productId?.length == 0 || this.couponForm.value.productId == null) {

        this.couponForm.value.productId = "";
      }
      if (this.couponForm.value.collectionId?.length == 0 || this.couponForm.value.collectionId == null) {

        this.couponForm.value.collectionId = "";
      }
      if (!this.couponForm.value.productId && !this.couponForm.value.recipeId && !this.couponForm.value.collectionId) {
        this.couponProductError = true;
        this.afterErrorChecked()
        return
      } else {
        this.couponProductError = false;
      }

      if (this.couponForm.value.productId) {
        this.getProductIds(this.couponForm.value.productId);
      }
      if (this.couponForm.value.recipeId) {
        this.getRecipeIds(this.couponForm.value.recipeId);
      }
      if (this.couponForm.value.categoryId) {
        this.getCategoriesId(this.couponForm.value.categoryId);
      }
      if (this.couponForm.value.collectionId) {
        this.getcollectionsId(this.couponForm.value.collectionId);
      }
      if (this.couponForm.value.subCategoryId) {
        this.getSubCategoriesId(this.couponForm.value.subCategoryId);
      }
      if (this.discountValueError) {
        this.afterErrorChecked()
        return
      }

    } else {
      this.couponForm.value.recipeId = "";
      this.couponForm.value.productId = "";
      this.couponForm.value.collectionId = "";
      this.couponForm.value.categoryId = "";
      if (this.discountValueError) {
        this.afterErrorChecked()
        return
      }
    }
    if (this.couponForm.value.freeProducts == "" || this.couponForm.value.freeProducts == null) {
      this.couponForm.value.freeProducts = [];
    }
    this.modalRef = this.modalService.show(template);
  }
  /** Get Data By object */

  submit() {
    this.modalRef.hide();
    this.isLoaderImage = true;
    if (this.couponID) {
      this.couponForm.value.couponID = this.couponID;
      this.couponService.updateCoupon(this.couponForm.value).subscribe(res => {
        if (res.success) {
          this.isLoaderImage = false;
          this.toastr.success(res.message);
          this.zone.run(() => {
            this.router.navigate(["/coupons"]);
          })
        } else {
          this.toastr.success(res.message);
        }
      })
    } else {
      this.couponService.addCoupon(this.couponForm.value).subscribe(res => {
        if (res.success) {
          this.isLoaderImage = false;
          this.toastr.success(res.message);
          this.zone.run(() => {
            this.router.navigate(["/coupons"]);
          })
        } else {
          this.toastr.success(res.message);
        }
      })
    }

  }
  /** Get Free Prodcuts  */
  getFreeProducts() {
    let prodData: any = this.productService.getAllProdData();
    this.allFreeProducts = JSON.parse(prodData);
    for (let index = 0; index < this.allFreeProducts.length; index++) {
      const element = this.allFreeProducts[index];
      element.productDescriptionNew = `${element.productDescription} (Product ID - ${element.productId})`;
    }
  }

  checkValue() {
    var inputVal = (document.getElementById('searchProduct1') as HTMLInputElement).value;
    if (inputVal != undefined) {
      if (inputVal == "") {
        var res = document.getElementById('searchProduct2')
        if (res != undefined) {
          res.style.display = 'none';
        }
      } else {
        var res = document.getElementById('searchProduct2')
        if (res != undefined) {
          res.style.display = 'block';
        }
      }
    }
  }

  /** Get products name or product ID */
  getAllProductsName() {
    let prodData: any = this.productService.getAllProdData();
    this.allProducts = JSON.parse(prodData);

  }
  /** Get All Categories */

  allCategoriesList() {
    this.categoryService.getAllcategories().subscribe(res => {
      this.allCategories = res.items.filter(function (e: any) {
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

  /**Search Categories */
  selectCategoryEvent(event: any) {
    this.catIds = [];
    this.catIds.push({ categoryId: event.categoryId })
    let productPrice: any;
    let isDisabled: boolean = false;
    const products = [];
    const searchString = event.categoryId;
    /** This is only for one field */
    // const searchProduct = this.searchString.transform('categoryId',this.allProducts,searchString);
    // searchProduct.forEach((element:any) => {
    //   isDisabled = false;
    //   if(element.productDescription){
    //     this.productSalePrice = element.salesPrice;
    //     this.productavailableQuantity = element.availableQuantity;
    //     if(element.agreementValue != null && element.agreementValue != ""){
    //       productPrice = element.agreementValue
    //     }else{
    //       productPrice = element.salesPrice
    //     }  
    //     if(this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined){
    //       isDisabled = true;
    //     }else if(this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined){
    //       isDisabled = true;
    //     }
    //     this.productsName.push({productId:element.productId,productDescription:element.productDescription,productPrice:productPrice ,isDisabled: isDisabled})
    //   }

    // });
    // this.searchProducts = this.productsName.filter(function(e) {
    //   return e.productDescription !== '';
    // });
    this.getListRecipes();
    this.subCategories();
    this.couponForm.patchValue({
      recipeId: [],
      collectionId: []
    })
  }
  /** Select All categoris */
  onSelectAllCategory(event: any) {
    let productPrice: any;
    let isDisabled: boolean = false;
    event.forEach((element: any, index: any) => {
      this.catIds.push({ categoryId: element.categoryId })
    });
    this.productsName = [];
    this.allProducts.forEach((element: any) => {
      isDisabled = false;
      if (element.productDescription) {
        this.productSalePrice = element.salesPrice;
        this.productavailableQuantity = element.availableQuantity;
        if (element.agreementValue != null && element.agreementValue != "") {
          productPrice = element.agreementValue
        } else {
          productPrice = element.salesPrice
        }
        if (this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined) {
          isDisabled = true;
        } else if (this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined) {
          isDisabled = true;
        }
        this.productsName.push({ productId: element.productId, productDescription: element.productDescription, productPrice: productPrice, isDisabled: isDisabled })
      }
      this.searchProducts = this.productsName.filter(function (e) {
        return e.productDescription !== '';
      });

    })
    this.getListRecipes();
    this.subCategories();
  }

  /** Delete All Select Categories */
  onDeSelectAllCategory(event: any) {
    this.searchProducts = [];
  }
  /** Delete Select Categories */

  DropDownClose(event: any) {
    this.subCategoryNames = [];
    this.searchProducts = [];
    this.subCategoriesNames = [];
    this.catIds = [];
    this.subCategoryList = [];
  }
  /** AllProducts */
  onSelectAllProducts(item: any) {
    this.calculateProductPrice(item, 'products')
    this.couponChooseProduct = true;
    this.couponChooseRecipe = false;
    this.couponProductOr = false;
    this.couponChooseCollection = false;
    this.couponCollectionOr = false;
    this.classProduct = "12";
    this.couponProductError = false;
  }
  /** Remove Single product */
  DropDownProductClose(item: any) {
    this.calculateProductPrice(item, 'removeProduct');
    const data = this.couponForm['controls']['productId'].value;
    if (data.length == 0) {
      this.couponChooseProduct = false;
      this.couponChooseRecipe = false;
      this.couponProductOr = true;
      this.couponChooseCollection = false;
      this.couponCollectionOr = true;
      this.classProduct = "3";
    }
  }
  /** Remove All Products */
  onDeSelectProducts(items: any) {
    this.calculateProductPrice(items, 'products');
    const data = items;
    if (data.length == 0) {
      this.couponChooseProduct = false;
      this.couponChooseRecipe = false;
      this.couponProductOr = true;
      this.couponChooseCollection = false;
      this.couponCollectionOr = true;
      this.classProduct = "3";
    }
  }
  /** Get All Recipes */

  getListRecipes() {

    this.recipeService.getRecipes().subscribe(res => {
      this.recipeService.removeRecipeData();
      this.allRecipes = res.items;
      this.recipeService.sendAllRecipesData(res.items);
    })
    const data: any = this.recipeService.getAllRecipesData();
    this.allRecipes = JSON.parse(data);
  }
  onItemSelectRecipe(item: any) {
    this.recipeData(item, 'single');
    this.couponChooseProduct = false;
    this.couponChooseRecipe = true;
    this.couponProductOr = false;
    this.couponChooseCollection = false;
    this.couponCollectionOr = false;
    this.classProduct = "12";
    this.couponProductError = false;
    this.clearData();
    this.couponForm.patchValue({
      collectionId: []
    })
  }
  onSelectAllRecipe(item: any) {
    this.recipeData(item, 'multiple');
    this.couponChooseProduct = false;
    this.couponChooseRecipe = true;
    this.couponCollectionOr = false;
    this.couponChooseCollection = false;
    this.couponProductOr = false;
    this.classProduct = "12";
    this.couponProductError = false;
  }
  /** Remove Single Recipe data */
  DropDownRecipeClose(item: any) {
    this.recipeData(item, 'removeRecipe');
    const data = this.couponForm['controls']['recipeId'].value;
    if (data.length == 0) {
      this.couponChooseProduct = false;
      this.couponChooseRecipe = false;
      this.couponProductOr = true;
      this.couponChooseCollection = false;
      this.couponCollectionOr = true;
      this.classProduct = "3";
    }
  }
  /** Remove All recipe Data */
  onDeSelectRecipes(items: any) {
    this.recipeData(items, 'multiple');
    const data = items;
    if (data.length == 0) {
      this.couponChooseProduct = false;
      this.couponChooseRecipe = false;
      this.couponProductOr = true;
      this.couponChooseCollection = false;
      this.couponCollectionOr = true;
      this.classProduct = "3";
    }
  }
  /** This  function use for products */
  onItemSelect(item: any) {
    this.calculateProductPrice(item, 'singleProduct');
    this.couponChooseProduct = true;
    this.couponChooseRecipe = false;
    this.couponProductOr = false;
    this.couponChooseCollection = false;
    this.couponCollectionOr = false;
    this.couponProductError = false;
    this.classProduct = "12";
  }


  /** Get All Collections */

  getListCollections() {

    this.collectionService.getAllCollection(1, 1000).subscribe(res => {
      this.collectionService.removeCollectionsData();
      this.allCollections = res.items;
      this.collectionService.sendAllCollectionsData(this.allCollections);
    })
    this.allCollections = this.collectionService.getAlCollectionsData();
    this.allCollections = JSON.parse(this.allCollections);
    //this.allCollections = this.getUniqueListBy(this.allCollections,'collectionName');
  }
  onItemSelectCollection(item: any) {
    this.collectionData(item, 'single')
    this.couponChooseProduct = false;
    this.couponChooseRecipe = false;
    this.couponProductOr = false;
    this.couponChooseCollection = true;
    this.couponCollectionOr = false;
    this.classProduct = "12";
    this.couponProductError = false;
    this.clearData();
    this.couponForm.patchValue({
      recipeId: []
    });
  }
  onSelectAllCollection(item: any) {
    this.collectionData(item, 'multiple')
    this.couponChooseProduct = false;
    this.couponChooseRecipe = false;
    this.couponProductOr = false;
    this.couponCollectionOr = false;
    this.couponChooseCollection = true;
    this.classProduct = "12";
    this.couponProductError = false;
    this.clearData();
    this.couponForm.patchValue({
      recipeId: []
    });
  }
  /** Remove Single Collection data */
  DropDownCollectionClose(item: any) {
    this.collectionData(item, 'removeCollection');
    const data = this.couponForm['controls']['collectionId'].value;
    if (data.length == 0) {
      this.couponChooseProduct = false;
      this.couponChooseRecipe = false;
      this.couponProductOr = true;
      this.couponChooseCollection = false;
      this.couponCollectionOr = true;
      this.classProduct = "3";
    }
  }
  /** Remove All Collection Data */
  onDeSelectCollections(items: any) {
    this.collectionData(items, 'multiple');
    const data = items;
    if (data.length == 0) {
      this.couponChooseProduct = false;
      this.couponChooseRecipe = false;
      this.couponProductOr = true;
      this.couponChooseCollection = false;
      this.couponCollectionOr = true;
      this.classProduct = "3";
    }
  }

  /** Choose Free Products */
  onfreeItemSelect(event: any) {

  }
  onSelectAllFreeProducts(event: any) {

  }
  DropDownFreeProductClose(event: any) {

  }
  onDeSelectFreeProducts(event: any) {

  }
  /** Remove Duplicate products */
  getUniqueListBy(arr: any, key: any) {
    return [...new Map(arr?.map((item: any) => [item[key], item])).values()]
  }

  /** Get string product Ids */

  getProductIds(data: any) {
    this.couponProductIDs = [];
    data?.forEach((element: any) => {
      this.couponProductIDs.push(element.productId)
    });
    this.couponForm.value.productId = this.couponProductIDs.join(',');
  }
  /** Get Recipe Ids */
  getRecipeIds(data: any) {
    data.forEach((element: any) => {
      this.couponRecipesID.push(element.recipeId)
    });
    this.couponForm.value.recipeId = this.couponRecipesID.join(',');
  }

  /** Get Categories Ids */
  getCategoriesId(data: any) {

    data.forEach((element: any) => {
      if (element?.categoryId) {
        this.couponCategoriesID.push(element.categoryId)
      } else {
        this.couponCategoriesID.push(element)
      }
    });
    this.couponForm.value.categoryId = this.couponCategoriesID.join(',');
  }
  /** Get Sub-Category with categories id */
  getSubCategoriesWithID(data: any) {
    console.log(data)
    data?.forEach((element: any) => {
      console.log(element)
      const formData: FormData = new FormData();
      formData.append('categoryId', element)
      this.categoryService.getAllSubcategories(formData).subscribe(res => {
        console.log(res)
        this.subCategoryList.push(res.items);
        this.subCategoryName(this.subCategoryList)
      })
    });
  }
  /** Get Sub categories  Ids */
  getSubCategoriesId(data: any) {

    data.forEach((element: any) => {
      if (element?.subCategoryId) {
        this.couponSubCategoryId.push(element.subCategoryId)
      } else {
        this.couponSubCategoryId.push(element)
      }


    });
    this.couponForm.value.subCategoryId = this.couponSubCategoryId.join(',');
  }
  /** Get Collections Ids */
  getcollectionsId(data: any) {

    data.forEach((element: any) => {
      if (element?.collectionId) {
        this.couponCollectionsID.push(element.collectionId)
      } else {
        this.couponCollectionsID.push(element)
      }
    });
    this.couponForm.value.collectionId = this.couponCollectionsID.join(',');
  }
  /** getProductsWith categories id */

  getProductsWithId(ID: any) {
    let isDisabled: boolean = false;
    ID?.forEach((element: any) => {
      this.catIds.push({ categoryId: element })
    });
    //
    const products = [];
    //const searchString = event.categoryId;
    /** This is only for one field */
    this.catIds.forEach((res: any) => {
      const serchProduct = this.searchString.transform('categoryId', this.allProducts, res.categoryId);
      serchProduct.forEach((element: any) => {
        isDisabled = false;
        if (element.productDescription) {
          this.productSalePrice = element.salesPrice;
          this.productavailableQuantity = element.availableQuantity;
          if (this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined) {
            isDisabled = true;
          } else if (this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined) {
            isDisabled = true;
          }
          this.productsName.push({ productId: element.productId, productDescription: element.productDescription, isDisabled: isDisabled })
        }

      });
      this.searchProducts = this.productsName.filter(function (e) {
        return e.productDescription !== '';
      });
    })
    this.getListRecipes();
  }
  /** Get Discount value after select discount type */
  getDiscountValue(event: any) {
    this.discountValue = event.target?.value;
    if (this.discountValue == undefined) {
      this.discountValue = event
    }
    this.couponForm.patchValue({ discountAmount: this.discountValue });
    let calculateVale: any;
    if (this.couponDiscountType == 'Percent') {
      if (this.couponForm.value.isGlobal != true) {
        if (this.couponDiscountPrice == 0) {
          this.discountValueError = "Please Choose Products OR Choose Recipes OR Choose Collections";
        }
        else if (this.discountValue > 99) {
          this.discountValueError = "Please enter a value less than 99"
        } else {
          this.discountValueError = "";
          // calculateVale = this.couponDiscountPrice - (this.couponDiscountPrice * this.discountValue)/100;
          calculateVale = (this.couponDiscountPrice * this.discountValue) / 100;

        }
      } else {
        if (this.discountValue > 99) {
          this.discountValueError = "Please enter a value less than 99"
        } else {
          this.discountValueError = "";
        }
      }
    } else if (this.couponDiscountType == 'Fixed') {
      if (this.couponForm.value.isGlobal != true) {
        if (this.couponDiscountPrice == 0) {
          this.discountValueError = "Please Choose Products OR Choose Recipes OR Choose Collections";
        }
        else if (this.couponDiscountPrice < this.discountValue) {
          this.discountValueError = "Please enter a value less than " + this.couponDiscountPrice;
        } else {
          this.discountValueError = "";
          // calculateVale = this.couponDiscountPrice - this.discountValue;
          calculateVale = this.discountValue;
        }
      }

    }
    if (calculateVale) {
      // this.couponForm.patchValue({discountAmount: calculateVale.toFixed(2) });
    }

  }
  /** Get discount type */
  getDiscountType(event: any) {
    this.couponDiscountType = event.target?.value;

    if (this.couponDiscountType == undefined) {
      this.couponDiscountType = event
    }

    switch (this.couponDiscountType) {
      case 'BOGO':
        this.couponFreeProducts = true;
        this.couponDiscountValue = false;
        this.couponDiscountPlaceholder = "";
        break;
      case 'Free Delivery':
        this.couponFreeProducts = false;
        this.couponDiscountValue = false;
        this.couponDiscountPlaceholder = "";
        break;
      case 'Percent':
        this.couponFreeProducts = false;
        this.couponDiscountValue = true;
        this.couponDiscountPlaceholder = "Percent";
        break;
      case 'Fixed':
        this.couponFreeProducts = false;
        this.couponDiscountValue = true;
        this.couponDiscountPlaceholder = "Fixed";
    }
  }

  /** Calulate Product Price */
  calculateProductPrice(data: any, type: any) {
    let productPrice;
    let that = this;
    if (type == 'singleProduct') {
      this.allProducts.filter(function (e: any) {
        if (e.productId == data.productId) {
          that.productavailableQuantity = e.availableQuantity;
          if (e.agreementValue != null && e.agreementValue != "") {
            productPrice = e.agreementValue
            that.productSalePrice = e.salesPrice
          } else {
            productPrice = e.salesPrice
            that.productSalePrice = e.salesPrice
          }
          that.couponCalculatePrice.push({ productId: e.productId, productDescription: e.productDescription, productPrice: productPrice });
        }
      });

    } else if (type == 'removeProduct') {
      this.couponCalculatePrice.forEach((element: any, index: any) => {
        if (element.productId == data.productId) {
          this.couponCalculatePrice.splice(index, 1)
        }
      });

    } else {
      this.couponCalculatePrice = [];
      data.filter(function (d: any) {
        that.allProducts.filter(function (e: any) {
          if (e.productId == d.productId) {
            if (e.agreementValue != null && e.agreementValue != "") {
              productPrice = e.agreementValue
            } else {
              productPrice = e.salesPrice
            }
            that.couponCalculatePrice.push({ productId: e.productId, productDescription: e.productDescription, productPrice: productPrice });
          }
        });
      })

    }
    this.couponDiscountPrice = this.couponCalculatePrice.reduce(function (accumulator, item) {
      return accumulator + item.productPrice;
    }, 0);
    if (this.discountValue) {
      this.getDiscountValue(this.discountValue);
    }
  }
  /** Get Product from recipe data */
  recipeData(item: any, type: any) {
    let that = this;
    if (type == 'single') {
      this.allRecipes.filter(function (e: any) {
        if (e.recipeId == item.recipeId) {
          e.ingredientToSale.filter(function (productId: any) {
            that.recipeProducts.push({ productId: productId.productId })
          })

        }

      })
    } else if (type == 'multiple') {
      this.recipeProducts = [];
      item.forEach((ele: any) => {
        this.allRecipes.filter(function (e: any) {
          if (e.recipeId == ele.recipeId) {
            e.ingredientToSale.filter(function (productId: any) {
              that.recipeProducts.push({ productId: productId.productId })
            })

          }

        })
      });
    } else if (type == 'removeRecipe') {
      this.allRecipes.filter(function (all: any) {
        if (all.recipeId == item.recipeId) {
          all.ingredientToSale.filter(function (productId: any) {
            that.recipeProducts.filter(function (pid: any, index: any) {
              if (productId.productId == pid.productId) {
                that.recipeProducts.splice(index, 1)
              }
            })

          })
        }
      })
      // this.recipeProducts.forEach((element:any,index:any) => {

      //   if(element.productId == item.productId){
      //    this.recipeProducts.splice(index,1)
      //   }
      // });
    }
    if (that.recipeProducts) {
      that.recipeProducts = this.getUniqueListBy(that.recipeProducts, 'productId');
    }
    this.calculateProductPrice(that.recipeProducts, 'products')


  }

  /** Get Product from collections data */
  collectionData(item: any, type: any) {
    let productIds;
    let recipeIds;

    let that = this;
    if (type == 'single') {
      this.allCollections.filter(function (e: any) {
        if (e.collectionId == item.collectionId) {
          if (e.productId != null || e.productId) {
            productIds = e.productId.split(",");
            productIds.forEach((id: any) => {
              that.allProducts.filter(function (e: any) {
                if (e.productId == id) {
                  that.collectionProducts.push({ productId: e.productId })
                }
              });
            })
          } else {
            recipeIds = e.recipeId.split(",");
            recipeIds.forEach((ele: any) => {
              that.allRecipes.filter(function (e: any) {
                if (e.recipeId == ele) {
                  e.ingredientToSale.filter(function (productId: any) {
                    that.collectionProducts.push({ productId: productId.productId })
                  })

                }

              })
            });
          }
        }
      })

    } else if (type == 'removeCollection') {
      this.allCollections.filter(function (e: any) {
        if (e.collectionId == item.collectionId) {
          if (e.productId != null || e.productId) {
            productIds = e.productId.split(",");
            productIds.forEach((id: any) => {
              that.collectionProducts.filter(function (e: any, index: any) {
                if (e.productId == id) {
                  that.collectionProducts.splice(index, 1)
                }
              });
            })
          }
          else {
            recipeIds = e.recipeId.split(",");
            recipeIds.forEach((ele: any) => {
              that.allRecipes.filter(function (e: any) {
                if (e.recipeId == ele) {
                  e.ingredientToSale.filter(function (productId: any, index: any) {
                    that.collectionProducts.filter(function (pid: any, index: any) {
                      if (productId.productId == pid.productId) {
                        that.collectionProducts.splice(index, 1)
                      }

                    })

                  })

                }

              })
            });
          }
        }
      })
    }
    else if (type == 'multiple') {
      this.collectionProducts = [];
      item.forEach((ele: any) => {
        this.allCollections.filter(function (e: any) {
          if (e.collectionId == ele.collectionId) {
            if (e.productId != null || e.productId) {
              productIds = e.productId.split(",");
              productIds.forEach((id: any) => {
                that.allProducts.filter(function (e: any) {
                  if (e.productId == id) {
                    that.collectionProducts.push({ productId: e.productId })
                  }
                });
              })
            } else {
              recipeIds = e.recipeId.split(",");
              recipeIds.forEach((ele: any) => {
                that.allRecipes.filter(function (e: any) {
                  if (e.recipeId == ele) {
                    e.ingredientToSale.filter(function (productId: any) {
                      that.collectionProducts.push({ productId: productId.productId })
                    })

                  }

                })
              });
            }
          }
        })

      })
    }
    if (that.collectionProducts) {
      that.collectionProducts = this.getUniqueListBy(that.collectionProducts, 'productId');
    }
    this.calculateProductPrice(that.collectionProducts, 'products')
  }

  /** get edit time data */
  getSingleCouponObject(ID: any) {
    this.couponService.currentObject.subscribe(couponObj => this.couponObj = couponObj)
    if (this.couponObj) {
      this.couponDetail = this.couponObj
      this.couponService.clearcouponData()
      this.couponService.sendcouponData(this.couponObj)
    } else {
      const data: any = this.couponService.getcouponData();
      this.couponDetail = JSON.parse(data);
    }
  }

  /** select search product name and product id */
  selectEvent(event: any) {
    this.couponForm.value.freeProducts = []
    let productID = parseInt(event.productId)
    this.freeProductName = event.productDescription;
    if (this.couponID) {
      this.couponForm.value.freeProducts = [{ productId: productID, freeProductId: this.couponDetail.freeProducts[0]?.freeProductId, couponId: this.couponID }]
    } else {
      this.couponForm.value.freeProducts = [{ productId: productID }]
    }
  }

  forceUppercaseConditionally(event: any) {
    this.couponForm.patchValue({ couponCode: event.target.value.toUpperCase() })

  }

  checkCouponCode(couponCode: any) {
    let getAllCoupon: any = this.couponService.getAllcouponData();
    getAllCoupon = JSON.parse(getAllCoupon);
    getAllCoupon.forEach((element: any) => {
      if (couponCode == element.couponCode) {
        this.isCheckCouponCode = true;
      }
    });
    //console.log(this.isCheckCouponCode);
    return this.isCheckCouponCode;
  }
  allCouponList() {
    this.couponService.getCoupon().subscribe(res => {
      this.couponService.clearAllcouponData();
      this.couponService.sendAllcouponData(res.item)
    })
  }
  afterErrorChecked() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /** Change Date */
  changeMinDate() {
    this.minFromToDate = new Date(this.couponForm.value.couponFromDate)

  }
  /** Get Subcategories form multiselect categories */
  subCategories() {
    this.subCategoryList = []
    this.catIds.forEach(element => {
      const formData: FormData = new FormData();
      formData.append('categoryId', element.categoryId)
      this.categoryService.getAllSubcategories(formData).subscribe(res => {
        this.subCategoryList.push(res.items);
        this.subCategoryName(this.subCategoryList)
      })
    });


  }
  subCategoryName(data: any) {
    this.subCategoriesNames = [];
    data[0].forEach((element: any) => {
      this.subCategoriesNames.push({ subCategoryId: element.subCategoryId })
    });
    this.subCategoryNames = this.subCategoriesNames;
  }
  /** Select single cat or more then one */
  selectSubCategoryEvent(event: any) {
    this.subCatId.push({ subCategoryId: event.subCategoryId });
    this.dataForSingleSubcategories(this.catIds[0]?.categoryId, event.subCategoryId)
  }
  onSelectAllSubCategory(event: any) {
    this.subCatId = event;
    this.searchProducts = [];
    this.dataForAllSubcategories(this.catIds[0]?.categoryId);
  }
  DropSubClose(event: any) {
    let isDisabled: boolean = false;
    this.subCatId.forEach((element: any, index: any) => {
      if (element.subCategoryId == event.subCategoryId) {
        this.subCatId.splice(index, 1)
      }
    });

    if (this.subCatId.length === 0) {
      this.searchProducts = [];
    }
    this.productsName = []
    this.subCatId = this.subCatId.filter(function (e) {
      return e.subCategoryId !== '';
    });
    this.subCatId.forEach((element: any) => {
      if (element.subCategoryId != event.subCategoryId) {
        const searchString = this.catIds[0].categoryId;
        const subCategory = element.subCategoryId;
        const serchProduct = this.searchString.transform2('categoryId', 'subCategoryId', this.allProducts, searchString, subCategory);
        serchProduct.forEach((element: any) => {
          if (element.productDescription) {
            isDisabled = false;
            this.productSalePrice = element.salesPrice;
            this.productavailableQuantity = element.availableQuantity;
            if (this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined) {
              isDisabled = true;
            } else if (this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined) {
              isDisabled = true;
            }
            this.productsName.push({ productId: element.productId, productDescription: element.productDescription, isDisabled: isDisabled })
          }

        });
        this.searchProducts = this.productsName.filter(function (e) {
          return e.productDescription !== '';
        });
      }

    })
  }
  onDeSelectAllSubCategory(event: any) {
    this.searchProducts = [];
  }
  /** Get Products For all Subcategories */
  dataForAllSubcategories(event: any) {
    const products = [];
    const searchString = event;
    let isDisabled: boolean = false;
    const serchProduct = this.searchString.transform('categoryId', this.allProducts, searchString);
    serchProduct.forEach((element: any) => {
      if (element.productDescription) {
        isDisabled = false;
        this.productSalePrice = element.salesPrice;
        this.productavailableQuantity = element.availableQuantity;
        if (this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined) {
          isDisabled = true;
        } else if (this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined) {
          isDisabled = true;
        }
        this.productsName.push({ productId: element.productId, productDescription: element.productDescription, isDisabled: isDisabled })
      }

    });
    this.searchProducts = this.productsName.filter(function (e) {
      return e.productDescription !== '';
    });

  }
  /** Get Products For single Sub category */
  dataForSingleSubcategories(cat: any, subCat: any) {
    const products = [];
    const searchString = cat;
    const subCategory = subCat;
    let isDisabled: boolean = false;
    const serchProduct = this.searchString.transform2('categoryId', 'subCategoryId', this.allProducts, searchString, subCategory);
    serchProduct.forEach((element: any) => {
      if (element.productDescription) {
        isDisabled = false;
        this.productSalePrice = element.salesPrice;
        this.productavailableQuantity = element.availableQuantity;
        if (this.productSalePrice == 0 || this.productSalePrice == null || this.productSalePrice == "" || this.productSalePrice == undefined) {
          isDisabled = true;
        } else if (this.productavailableQuantity == 0 || this.productavailableQuantity == null || this.productavailableQuantity == "" || this.productavailableQuantity == undefined) {
          isDisabled = true;
        }
        this.productsName.push({ productId: element.productId, productDescription: element.productDescription, isDisabled: isDisabled })
      }

    });
    this.searchProducts = this.productsName.filter(function (e) {
      return e.productDescription !== '';
    });

  }

  /** Hide popup */
  hideFuntions(type: any) {
    if (type == 'update') {
      this.modalRef.hide()
      this.router.navigate(["/coupons"]);
    } else {
      this.modalRef.hide()
    }

  }

  clearData(){
    this.couponForm.patchValue({
      categoryId: '',
      subCategoryId: '',
      productId: ''
    })
    this.subCategoryNames = [];
    this.searchProducts = [];
  }
}
