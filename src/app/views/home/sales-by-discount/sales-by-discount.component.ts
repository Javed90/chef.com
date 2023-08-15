import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sales-by-discount',
  templateUrl: './sales-by-discount.component.html',
  styleUrls: ['./sales-by-discount.component.css']
})
export class SalesByDiscountComponent implements OnInit {

  saleDiscountObj: any;
  saleDiscounts: any;
  saleDiscountSearch:any;
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

  constructor(
    private dashboardService: DashboardService,
    private searchString: SearchStringPipe,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getDateParams();
    this.getSaleByDiscountData();
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
    
   this.dateData = {fromDate: this.year+"-01-"+this.day+"T04:10:32.066Z",toDate: this.year+"-"+this.month+"-"+this.day+"T04:10:32.066Z" }
  }
  getSaleByDiscountData(){
    this.spinner.show();
    this.dashboardService.currentObject.subscribe(res=> this.saleDiscountObj = res);
    console.log(this.saleDiscountObj);
    if(this.saleDiscountObj){
      this.salesByDiscountData(this.dateData);
    }else{
      const data:any = this.dashboardService.getDiscountData();
      this.saleDiscounts = JSON.parse(data);
      this.saleDiscountSearch = JSON.parse(data);
      this.total = this.saleDiscountSearch.length;
      this.spinner.hide();
    }
    console.log(this.saleDiscounts)
  }

   /** Search by products */
   productTypeSearch(event:any,type:any){
     console.log(event.target.value)
    const stringVal =event.target.value
    this.saleDiscountSearch = this.searchString.transform(type,this.saleDiscounts,stringVal);
    this.p = 1;
    this.total = this.saleDiscountSearch?.length;
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
    this.salesByDiscountData(this.dashBoardForm.value);
  }

  /**Sales By Discount */
salesByDiscountData(data:any){
  this.dashboardService.salesByDiscount(data).subscribe(res=>{
    this.dashboardService.clearDiscountData();
    this.dashboardService.sendDiscountData(res.data);
    this.saleDiscounts = res.data;
    this.saleDiscountSearch = res.data;
    this.total = this.saleDiscounts.length;
    this.spinner.hide();
  })
}
exportAll(){
  this.dateData.downloadReport = true;
  console.log(this.dateData)
  this.dashboardService.salesByDiscount(this.dateData).subscribe(res=>{
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
}
