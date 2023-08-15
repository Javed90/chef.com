import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonCategoriesService } from 'src/app/_services/common-categories.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  modalRef!: BsModalRef;
  productsList: any;
  p: number = 1;
  total: any;
  productListWithSearch: any;
  dropdownSubCategorySettings: any;
  imagePath: string = environment.productImagePath;
  isChecked: boolean = true;
  brands: Array<any> = [];
  origin: Array<any> = [];
  categories: Array<any> = [];
  status: Array<any> = [];
  selectBrands: Array<any> = [];
  selectBrandsProducts: Array<any> = [];
  selectOrigin: Array<any> = [];
  selectCategories: Array<any> = [];
  selectStatus: Array<any> = [];
  catSortData: Array<any> = [];
  sortData: Array<any> = [];
  productStatus: Array<any> = [];
  isSortShow: boolean = true;
  isErrorMessage:any;
  isCategory: any;
  isSelectButton: boolean = false;

   /** sub category variable */
 subCategoryList:Array<any> = [];
 subCategoriesNames:Array<any> = [];
 subCategoryNames: any;
 subCatId:Array<any> = [];
catID: any;
  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private searchString: SearchStringPipe,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private categoryService: CommonCategoriesService
  ) { }

  ngOnInit(): void {
   this.products();
   this.dropdownSubCategorySettings = {
    idField: 'subCategoryId',
    textField: 'subCategoryId',
    allowSearchFilter: true
  }
  }
  reset(item:any){
    this.isCategory = "";
    this.selectBrands = [];
    this.brands = [];
    this.origin = [];
    this.status = [];
    this.selectStatus = [];
    this.selectCategories = [];
    this.selectOrigin = [];
    this.products();
  }
  products(){
   
  this.productService.clearProductData();
  //   const prodData = this.productService.getAllProdData()
  // if(prodData){
  //  this.productListWithSearch = JSON.parse(prodData);
  //  this.productsList = JSON.parse(prodData)
  // }else{
    this.spinner.show();
    this.productService.getProducts(1,10000).subscribe(res=>{
      this.productsList = res.items; 
      this.productListWithSearch = this.productsList.filter(function(e:any) {
        return e.productDescription != null;
      });
      this.productService.sendAllProductsData(this.productListWithSearch);
      console.log(this.productListWithSearch)
      this.total = this.productListWithSearch.length;
      this.spinner.hide();
    })
  //}
  let that = this;
  setTimeout(function () {
    that.getAttributeData();
   }, 2500);
  }
  /** Search by product name */
  productTypeSearch(event:any){
    const stringVal =event.target.value.replace(/^\s+|\s+$/gm,'')
    this.productListWithSearch = this.searchString.transform('productDescription',this.productsList,stringVal);
    this.p = 1;
    this.total = this.productListWithSearch.length;
  }

  sendObject(item:any){
    this.productService.changeObject(item);
  }

 /** Remove Duplicate products */
 getUniqueListBy(arr:any, key:any) {
  return [...new Map(arr.map((item:any) => [item[key], item])).values()]
}
/** get check brands */
selectedBrands(name:any,event:any){
console.log(name,event.target.checked)
  if(event.target.checked){
    this.selectBrands.push({brand:name})
  }else{
    this.selectBrands.forEach((element:any,index:any) => {
      if(element.brand == name){
       this.selectBrands.splice(index,1)
      }
    })
    this.status = []
    this.origin = []
  }
 this.selectBrands = this.getUniqueListBy(this.selectBrands,'brand')
 console.log(this.selectBrands);
 this.selectBrands.forEach((res:any)=>{
  this.catSortData.forEach((element:any) => {
    console.log(element);
    if(res.brand == element.brand){
      /** Get All Origins */
    this.origin.push({origin: element.origin});
    }
  })
 })
/** Origin */
  this.origin = this.getUniqueListBy(this.origin,'origin')
    this.origin = this.origin.filter(function(e:any) {
      return e.origin != null;
    });

 
}
/** get check origins */
selectedOrigin(name:any,event:any){
  console.log(name,event.target.checked)
  if(event.target.checked){
    this.selectOrigin.push({origin:name});
  }else{
    this.selectOrigin.forEach((element:any,index:any) => {
      if(element.origin == name){
       this.selectOrigin.splice(index,1)
      }
    })
    this.status = []
  }
  this.selectOrigin = this.getUniqueListBy(this.selectOrigin,'origin')
  this.selectOrigin.forEach((res:any)=>{
    this.catSortData.forEach((element:any) => {
      console.log(element);
      if(res.origin == element.origin){
        /** Get All status */
        this.status.push({status: element.status});
      }
    })
   })
   /**status*/
  this.status = this.getUniqueListBy(this.status,'status')
    this.status = this.status.filter(function(e:any) {
      return e.status != null;
    });
}
/** get check status */
selectedStatus(name:any,event:any){
  console.log(name,event.target.checked)
  if(event.target.checked){
    this.selectStatus.push({status:name});
  }else{
    this.selectStatus.forEach((element:any,index:any) => {
      if(element.status == name){
       this.selectStatus.splice(index,1)
      }
    })
  }
  this.selectStatus = this.getUniqueListBy(this.selectStatus,'status')
}
/** get check Categories */
selectedCategories(name:any,event:any){
  console.log(name,event.target.checked)
  if(event.target.checked){
    this.selectCategories.push({categoryId:name});
  }else{
    this.selectCategories.forEach((element:any,index:any) => {
      if(element.categoryId == name){
       this.selectCategories.splice(index,1)
      }
    })
    this.catSortData = []
    this.brands = []
    this.status = []
    this.origin = []
  }

  if(this.selectCategories || this.selectCategories != null || this.selectCategories != undefined){
    this.selectCategories.forEach(res => {
      let proData = this.searchString.transform('categoryId',this.productsList,res.categoryId);
      console.log(proData)
      proData.forEach((element:any) => {
        this.catSortData.push(element)
      });
    });
  }
  this.categoryProducts();
 

}
/** apply and find value */
submit(event:any){
  this.sortData = [];
  
 if(this.selectBrands.length == 0 && this.selectStatus.length == 0 && this.selectCategories.length > 0 && this.selectOrigin.length == 0){
    console.log(this.selectCategories)
    if(this.selectCategories || this.selectCategories != null || this.selectCategories != undefined){
      this.selectCategories.forEach(res => {
        let proData = this.searchString.transform('categoryId',this.catSortData,res.categoryId);
        console.log(proData)
        proData.forEach((element:any) => {
          this.sortData.push(element)
        });
      });
    }
  }
  else if(this.selectBrands.length > 0 && this.selectStatus.length == 0 && this.selectCategories.length > 0 && this.selectOrigin.length == 0){
    if(this.selectBrands || this.selectBrands != null || this.selectBrands != undefined){
      this.selectBrands.forEach(res => {
        this.selectCategories.forEach(res2 => {
          let proData = this.searchString.transform2('brand','categoryId',this.catSortData,res.brand,res2.categoryId);
        console.log(proData)
        proData.forEach((element:any) => {
          this.sortData.push(element)
        });
        })
        
      });
    }
  }else if(this.selectBrands.length == 0 && this.selectStatus.length > 0 && this.selectCategories.length > 0 && this.selectOrigin.length == 0){
    if(this.selectBrands || this.selectBrands != null || this.selectBrands != undefined){
      this.selectStatus.forEach(res => {
        this.selectCategories.forEach(res2 => {
          let proData = this.searchString.transform2('status','categoryId',this.catSortData,res.status,res2.categoryId);
        console.log(proData)
        proData.forEach((element:any) => {
          this.sortData.push(element)
        });
        })
        
      });
    }
  }else if(this.selectBrands.length == 0 && this.selectStatus.length == 0 && this.selectCategories.length > 0 && this.selectOrigin.length > 0){
    if(this.selectBrands || this.selectBrands != null || this.selectBrands != undefined){
      this.selectOrigin.forEach(res => {
        this.selectCategories.forEach(res2 => {
          let proData = this.searchString.transform2('origin','categoryId',this.catSortData,res.origin,res2.categoryId);
        console.log(proData)
        proData.forEach((element:any) => {
          this.sortData.push(element)
        });
        })
        
      });
    }
  }else if(this.selectBrands.length == 0 && this.selectStatus.length > 0 && this.selectCategories.length > 0 && this.selectOrigin.length > 0){
    if(this.selectBrands || this.selectBrands != null || this.selectBrands != undefined){
      this.selectOrigin.forEach(res => {
        this.selectCategories.forEach(res2 => {
            this.selectStatus.forEach(res3 => {
              let proData = this.searchString.transform3('origin','categoryId',"status",this.catSortData,res.origin,res2.categoryId,res3.status);
            proData.forEach((element:any) => {
              this.sortData.push(element)
            });
          })
        })
        
      });
    }
  }
  else if(this.selectBrands.length > 0 && this.selectStatus.length == 0 && this.selectCategories.length > 0 && this.selectOrigin.length > 0){
    if(this.selectBrands || this.selectBrands != null || this.selectBrands != undefined){
      this.selectOrigin.forEach(res => {
        this.selectCategories.forEach(res2 => {
            this.selectBrands.forEach(res3 => {
              let proData = this.searchString.transform3('origin','categoryId',"brand",this.catSortData,res.origin,res2.categoryId,res3.brand);
            proData.forEach((element:any) => {
              this.sortData.push(element)
            });
          })
        })
        
      });
    }
  }else if(this.selectBrands.length > 0 && this.selectStatus.length > 0 && this.selectCategories.length > 0 && this.selectOrigin.length == 0){
    if(this.selectBrands || this.selectBrands != null || this.selectBrands != undefined){
      this.selectStatus.forEach(res => {
        this.selectCategories.forEach(res2 => {
            this.selectBrands.forEach(res3 => {
              let proData = this.searchString.transform3('status','categoryId',"brand",this.catSortData,res.status,res2.categoryId,res3.brand);
            proData.forEach((element:any) => {
              this.sortData.push(element)
            });
          })
        })
        
      });
    }
  }else if(this.selectBrands.length > 0 && this.selectStatus.length > 0 && this.selectCategories.length > 0 && this.selectOrigin.length > 0){
    if(this.selectBrands || this.selectBrands != null || this.selectBrands != undefined){
      this.selectStatus.forEach(res => {
        this.selectCategories.forEach(res2 => {
            this.selectBrands.forEach(res3 => {
              this.selectOrigin.forEach(res4 => {
              let proData = this.searchString.transform4('status','categoryId',"brand","origin",this.catSortData,res.status,res2.categoryId,res3.brand,res4.origin);
            proData.forEach((element:any) => {
              this.sortData.push(element)
            })
            });
          })
        })
        
      });
    }
  }


 this.productListWithSearch = this.getUniqueListBy(this.sortData,'productId');
 this.p = 1;
 this.total = this.productListWithSearch.length;   
 console.log(this.productListWithSearch);
 this.isSortShow = false;
// this.selectBrands = [];
 //this.brands = [];
// this.origin = [];
// this.status = [];
// this.selectStatus = [];
 //this.selectCategories = [];
// this.selectOrigin = [];

}
/** Get categories */
getAttributeData(){
  let prodData:any = this.productService.getAllProdData();
  this.productListWithSearch = JSON.parse(prodData);
  this.productListWithSearch.forEach((element:any) => {
   /** Get All Categories */
   this.categories.push({categoryId: element.categoryId});
  })
  /** Categories */
  this.categories = this.getUniqueListBy(this.categories,'categoryId')
    this.categories = this.categories.filter(function(e:any) {
      return e.categoryId != null;
    });

  
  
}
/** On click Show Popup */
sortShowPopup(){
  this.isSortShow = true;
}

/** Category Related Products Get brands, origin, status */
categoryProducts(){
  console.log(this.catSortData)
  this.catSortData.forEach((element:any) => {
    /** Get All Brands */
    this.brands.push({brand: element.brand});
    /** Get All Origins */
    // this.origin.push({origin: element.origin});
    
    /** Get All status */
    // this.status.push({status: element.status});
    
  });
  /** Brands */
  this.brands = this.getUniqueListBy(this.brands,'brand')
    this.brands = this.brands.filter(function(e:any) {
      return e.brand != null;
  });
  console.log(this.brands)
  /** Origin */
  // this.origin = this.getUniqueListBy(this.origin,'origin')
  //   this.origin = this.origin.filter(function(e:any) {
  //     return e.origin != null;
  //   });
  /**status*/
  // this.status = this.getUniqueListBy(this.status,'status')
  //   this.status = this.status.filter(function(e:any) {
  //     return e.status != null;
  //   });
}
/** Active Product Status */
productsUpdateStatus(event:any,template: TemplateRef<any>){
  if(event.target.checked){
    this.productListWithSearch.forEach((element:any,index:any) => {
      this.productListWithSearch[index].isProductActive = event.target.checked;
      this.productStatus.push({productId: element.productId,isProductActive: event.target.checked})
    });
  }else{
    this.productListWithSearch.forEach((element:any,index:any) => {
      this.productListWithSearch[index].isProductActive = event.target.checked;
      this.productStatus.push({productId: element.productId,isProductActive: event.target.checked})
    });
  }
  this.productStatus = this.getUniqueListBy(this.productStatus,'productId');
  this.isSelectButton = true;
  console.log(this.productStatus)
  this.modalRef = this.modalService.show(template);
}
cancelStatus(event:any){
  this.modalRef.hide();
  if(this.isChecked == true){
    this.isChecked = false
    this.productListWithSearch.forEach((element:any,index:any) => {
      this.productListWithSearch[index].isProductActive = false;
      this.productStatus.push({productId: element.productId,isProductActive: false})
    });
  }else{
    this.isChecked = true
    this.productListWithSearch.forEach((element:any,index:any) => {
      this.productListWithSearch[index].isProductActive = true;
      this.productStatus.push({productId: element.productId,isProductActive: true})
    });
  }
  
}
/** Select Category Products */
selectCategoryEvent(event:any){
  this.productStatus = [];
  this.isCategory = event.target.value;
  if(this.isCategory){
    this.isErrorMessage = "";
  }
  this.subCategories(this.isCategory)
  // this.productListWithSearch = this.searchString.transform('categoryId',this.productsList,this.isCategory);
  // this.p = 1;
  // this.total = this.productListWithSearch.length;
}

  /** Product single active / deactive products */
  productSingleStatus(val:any,event:any){
    console.log(event.target.checked);
    let isProduct:boolean = false;
    if(this.productStatus.length == 0){
      this.productStatus.push({productId: val,isProductActive: event.target.checked})
      this.isSelectButton = true;
    }else{
      console.log('not working')
      this.productStatus.forEach((element,index) => {
            if(element.productId == val){
             isProduct = true;
             this.productStatus[index].isProductActive = event.target.checked
             }
             this.isSelectButton = false;
          });
      }
      if(!isProduct){
        if(this.productStatus[0].productId != val){
          this.productStatus.push({productId: val,isProductActive: event.target.checked})
          this.isSelectButton = true;
        }
        
      }
    // if(event.target.checked){
    //   this.productStatus.push({productId: val,isProductActive: event.target.checked})
    // }else{
      
      // if(this.productStatus){
      //   this.productStatus.forEach((element,index) => {
      //     if(element.productId == val){
      //       this.productStatus.splice(index,1)
      //      this.productStatus[index].isProductActive = event.target.checked
      //      }
      //   });
      // }
      
    //}
    
    console.log(this.productStatus)
  }

/** Add active deactive Products */
productAddStatus(event:any){
  // if(this.isCategory == undefined || this.isCategory == ""){
  //   this.isErrorMessage = "Category is required";
  //   return
  // }
  this.modalRef.hide();
  this.spinner.show();
  this.productService.updateProductStatus(this.productStatus).subscribe(res=>{
    if(res.success){
       this.toastr.success(res.message);
       this.productStatus = [];
       this.products();
       this.spinner.hide();
    }else{
      this.toastr.success(res.message);
    }
  })

}

/** Get Subcategories form multiselect categories */
subCategories(cat:any){
  this.catID = cat;
  this.subCategoryList = []
   const formData: FormData = new FormData();
   formData.append('categoryId', cat)
   this.categoryService.getAllSubcategories(formData).subscribe(res=>{
     this.subCategoryList.push(res.items);
     this.subCategoryName(this.subCategoryList)
   })

 
 }
 subCategoryName(data:any){
   this.subCategoriesNames = [];
  data[0].forEach((element:any) => {
    this.subCategoriesNames.push({subCategoryId: element.subCategoryId})
  });
 this.subCategoryNames =  this.subCategoriesNames;
 console.log(this.subCategoryNames)
 }
 /** Select single cat or more then one */
 selectSubCategoryEvent(event:any){
   this.subCatId.push({subCategoryId: event.subCategoryId});
   this.dataForSingleSubcategories(this.catID,event.subCategoryId)
 }
 onSelectAllSubCategory(event:any){
   this.subCatId = event;
   this.dataForAllSubcategories(this.catID);
 }
 DropSubClose(event:any){
   console.log(event)
   let products:Array<any> = []
  let isDisabled: boolean = false;
  this.subCatId.forEach((element:any,index:any) => {
    if(element.subCategoryId == event.subCategoryId){
     this.subCatId.splice(index,1)
    }
  });
  if(this.subCatId.length === 0){
    this.productListWithSearch = [];
  }
   this.subCatId = this.subCatId.filter(function(e) {
    return e.subCategoryId !== '';
  });
  console.log(this.subCatId)
   this.subCatId.forEach((element:any)=>{
     if(element.subCategoryId != event.subCategoryId){
      const searchString = this.catID;
      const subCategory = element.subCategoryId;
      let serchProduct = this.searchString.transform2('categoryId','subCategoryId',this.productsList,searchString,element.subCategoryId);
      console.log(serchProduct)
      serchProduct.forEach((element:any) => {
        products.push(element);
      });
      
     }
   })
   console.log(products)
   this.productListWithSearch = products.filter(function(e:any) {
    return e.productDescription !== '';
  });
   this.p = 1;
   this.total = this.productListWithSearch.length;
 }
 onDeSelectAllSubCategory(event:any){
  this.productListWithSearch = [];
 }
 /** Get Products For all Subcategories */
 dataForAllSubcategories(event:any){
   const products = [];
   const searchString = event;
   let isDisabled: boolean = false;
   const serchProduct = this.searchString.transform('categoryId',this.productsList,searchString);
   this.productListWithSearch = serchProduct.filter(function(e:any) {
     return e.productDescription !== '';
   });
   this.p = 1;
   this.total = this.productListWithSearch.length;
 }
 /** Get Products For single Sub category */
 dataForSingleSubcategories(cat:any,subCat:any){
   let products:Array<any> = [];
   const searchString = cat;
   const subCategory = subCat;
   let isDisabled: boolean = false;
   this.subCatId.forEach((element:any)=>{
      const serchProduct:any = this.searchString.transform2('categoryId','subCategoryId',this.productsList,searchString,element.subCategoryId);
      serchProduct.forEach((element:any) => {
        products.push(element);
      });
    })
   this.productListWithSearch = products.filter(function(e:any) {
     return e.productDescription !== '';
   });
   this.p = 1;
   this.total = this.productListWithSearch.length;
 }
}
