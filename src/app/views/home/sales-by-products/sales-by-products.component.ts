import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { CommonCategoriesService } from 'src/app/_services/common-categories.service';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sales-by-products',
  templateUrl: './sales-by-products.component.html',
  styleUrls: ['./sales-by-products.component.css']
})
export class SalesByProductsComponent implements OnInit {

  saleProductObj: any;
  saleProducts: any;
  saleProductSearch:any;
  allCategories: any;
  /** pagination vaiables */
  p: number = 1;
  total: any;
  dashBoardForm!: FormGroup;
  submitted: boolean = false;
  /** Date Variable */
  maxDate = new Date();
  minDate = new Date();
  currentTime = new Date()

 // returns the month (from 0 to 11)
 month = this.currentTime.getMonth() + 1
 
 // returns the day of the month (from 1 to 31)
 day = this.currentTime.getDate()
 // returns the year (four digits)
 year = this.currentTime.getFullYear();
 lastYearMonth = this.currentTime.getMonth() + 3
 
 lastYear = this.currentTime.getFullYear() - 1;
 dateData:any;
 filePath:string = environment.imagePath;
  constructor(private dashboardService: DashboardService,
    private searchString: SearchStringPipe,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private categoryService: CommonCategoriesService) { }

  ngOnInit(): void {
    this.getDateParams();
    this.getSaleByProductData();
    this.allCategoriesList();
    this.dashBoardForm = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
    });
  }
  get f() { return this.dashBoardForm['controls']; }
  getDateParams(){
    console.log(this.month,this.day,this.lastYearMonth,this.lastYear)
    // if(this.month == 11){
    //   this.lastYearMonth = 1;
    //   this.lastYear = this.year + 1;
    // }else if(this.month == 12){
    //   this.lastYearMonth = 2;
    //   this.lastYear = this.lastYear + 1;
    // }
    
   this.dateData = {fromDate: this.year+"-01-"+this.day+"T04:10:32.066Z",toDate: this.year+"-"+this.month+"-"+this.day+"T04:10:32.066Z",downloadReport:false }
  }
  getSaleByProductData(){
    this.spinner.show();
    this.dashboardService.currentObject.subscribe(res=> this.saleProductObj = res);
    if(this.saleProductObj){
      this.salesByProductsData(this.dateData);
    }else{
      const data:any = this.dashboardService.getProductData();
      this.saleProducts = JSON.parse(data);
      this.saleProductSearch = JSON.parse(data);
      this.saleProductSearch = this.saleProductSearch.salesByProducts
      this.total = this.saleProductSearch.length;
      this.spinner.hide();
    }
    console.log(this.saleProducts)
  }

   /** Search by products */
   productTypeSearch(event:any,type:any){
    const stringVal =event.target.value.replace(/^\s+|\s+$/gm,'')
    this.saleProductSearch = this.searchString.transform(type,this.saleProducts.salesByProducts,stringVal);
    this.p = 1;
    this.total = this.saleProductSearch.length;
  }

  /** Sale over Time  */
  submit(event:any){
    this.submitted = true;
    // stop here if form is invalid
    if (this.dashBoardForm.invalid) {
        return;
    }
    this.spinner.show();
    this.dateData = this.dashBoardForm.value;
    this.salesByProductsData(this.dashBoardForm.value);
  }
  /**Sales By Products */
salesByProductsData(data:any){
  this.dashboardService.salesOverProducts(data).subscribe(res=>{
    console.log(res);
    this.dashboardService.clearProductData();
    this.dashboardService.sendProductData(res.data);
    this.saleProducts = res.data;
    this.saleProductSearch = res.data.salesByProducts;
    this.total = this.saleProductSearch.length;
    this.spinner.hide();
  })
}
exportAll(){
 this.dateData.downloadReport = true;
 this.dashboardService.salesOverProducts(this.dateData).subscribe(res=>{
  if(res.success){
    let url = this.filePath+"/images/csvfile/"+res.data;
    if(url){
    window.open(url, "_blank");
    }
    
    this.toastr.success(res.message);
    //this.router.navigate(["/notifications"]);
    }else{
    this.toastr.success(res.message);
    }
  })
}
 /** Get All Categories */

 allCategoriesList(){
  this.categoryService.getAllcategories().subscribe(res=>{
    this.allCategories = res.items.filter(function(e:any) {
      return e.categoryId != null;
    });
    console.log(this.allCategories);
    // res.items.forEach((element:any,index:any )=> {
    //   this.catItem = element.categoryId;
    //   if( element.categoryId){
    //     this.catIds.push({categoryId: element.categoryId})
    //   }
      
   //});
  })
}
}
