import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-over-time',
  templateUrl: './customer-over-time.component.html',
  styleUrls: ['./customer-over-time.component.css']
})
export class CustomerOverTimeComponent implements OnInit {

  customerOverObj: any;
  customerOverTime: any;
  customOverSearch:any;
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
    private router: Router,) { }

  ngOnInit(): void {
    this.getDateParams();
    this.getcustomerOverTimeData();
    this.dashBoardForm = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
    });
  }
  getcustomerOverTimeData(){
    this.spinner.show();
    this.dashboardService.currentObject.subscribe(res=> this.customerOverObj = res);
    if(this.customerOverObj){
      this.customerOverData(this.dateData);
    }else{
      const data:any = this.dashboardService.getCustomerOverTime();
      this.customerOverTime = JSON.parse(data);
      this.customOverSearch = JSON.parse(data);
      this.customOverSearch = this.customOverSearch.graphResponse;
      this.total = this.customOverSearch.length;
      this.spinner.hide();
    }
    console.log(this.customerOverTime)
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
  /** Search by products */
  productTypeSearch(event:any,type:any){
    const stringVal =event.target.value.replace(/^\s+|\s+$/gm,'')
    this.customOverSearch = this.searchString.transform(type,this.customerOverTime.graphResponse,stringVal);
    this.p = 1;
    this.total = this.customOverSearch?.length;
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
      this.customerOverData(this.dashBoardForm.value);
  }
/** customOverData */
customerOverData(data:any){
  this.dashboardService.customerOverTime(data).subscribe(res=>{
    this.dashboardService.clearCustomerOverTime();
    this.dashboardService.sendCustomerOverTime(res.data);
    this.customerOverTime = res.data;
    this.customOverSearch = res.data.graphResponse;
    this.total = this.customerOverTime.length;
    this.spinner.hide();
  })
}
exportAll(){
  this.dateData.downloadReport = true;
  console.log(this.dateData)
  this.dashboardService.customerOverTime(this.dateData).subscribe(res=>{
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

 /** customer details */

 viewCustomers(event:any){
   this.dashboardService.changeObject(event);
   this.router.navigate(["/customer-details"]);
 }
  
}
