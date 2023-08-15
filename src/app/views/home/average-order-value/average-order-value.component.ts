import { Component, OnInit } from '@angular/core';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-average-order-value',
  templateUrl: './average-order-value.component.html',
  styleUrls: ['./average-order-value.component.css']
})
export class AverageOrderValueComponent implements OnInit {

  avgOrderObj: any;
  avgOrderTime: any;
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
    private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.getDateParams();
    this.getAvgOrderValueData();
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
  getAvgOrderValueData(){
    this.spinner.show();
    this.dashboardService.currentObject.subscribe(res=> this.avgOrderObj = res);
    console.log(this.avgOrderObj)
    if(this.avgOrderObj){
      this.averageOrderValueData(this.avgOrderObj);
    }else{

      const data:any = this.dashboardService.getAverageOVData();
      this.avgOrderTime = JSON.parse(data);
      this.customOverSearch = JSON.parse(data);
      this.customOverSearch = this.customOverSearch.graphResponse;
      this.total = this.customOverSearch?.length;
      this.spinner.hide();
    }
    console.log(this.avgOrderTime)
  }
   /** Average Order Value Get Data */
 submit(event:any){
  this.submitted = true;
  // stop here if form is invalid
  if (this.dashBoardForm.invalid) {
      return;
  }
  this.spinner.show();
  this.dateData = this.dashBoardForm.value;
    this.averageOrderValueData(this.dashBoardForm.value);
}
  /** Search by products */
  productTypeSearch(event:any,type:any){
    const stringVal =event.target.value.replace(/^\s+|\s+$/gm,'')
    this.customOverSearch = this.searchString.transform(type,this.avgOrderTime.graphResponse,stringVal);
    this.p = 1;
    this.total = this.customOverSearch.length;
  }
  /** Average Order Value Get Data */
averageOrderValueData(data:any){
  this.dashboardService.averageOrdersValue(data).subscribe(res=>{
    this.spinner.hide();
    this.dashboardService.clearAverageOVData();
    this.dashboardService.sendAverageOVData(res.data);
    this.avgOrderTime = res.data;
    this.customOverSearch = res.data.graphResponse;
    this.total = this.customOverSearch.length;
  })
}
exportAll(){
  this.dateData.downloadReport = true;
  console.log(this.dateData)
  this.dashboardService.averageOrdersValue(this.dateData).subscribe(res=>{
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
