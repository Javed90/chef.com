import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList: any;
  commonOrderSearch: any;
  p: number = 1;
  total: any;
  orderSearch: any;
  filePath:string = environment.imagePath;
  orderItems: any;
  dateSearch:any;
  searchReqDate: any;
  searchReqTime: any;
  mytime:any;
  searchDateTimeForm!: FormGroup;
  submitted: boolean = false;
  timeSearchOrderData: any = [];
  viewOrderInvoiceData: any;
  @ViewChild('name') inputName:any; 
  constructor(
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private searchString: SearchStringPipe,
    private toastr: ToastrService,
    private router: Router,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.allOrders();
    this.searchDateTimeForm = this.formBuilder.group({
      //fullDate: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      fromTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]]
    });
  }
  get f() { return this.searchDateTimeForm['controls']; }
 /** Get All Orders */
 allOrders(){
  this.spinner.show();
  this.orderService.getAllOrders().subscribe(res=>{
    this.orderList = res.items;
    this.orderSearch = res.items;
    this.commonOrderSearch = this.orderSearch;
    this.total = res.items.length;
    this.spinner.hide();
  })
 }
 reset(item:any){
  if(item == 'reset'){
    //this.dateSearch = '';
    this.inputName.nativeElement.value = '';
    this.mytime = '';
    this.allOrders();
  }
  
  
 }
  /** Search By collection Type */

  ordersSearch(event:any){
    const stringVal =event.target.value.replace(/^\s+|\s+$/gm,'')
    this.orderSearch = this.searchString.transform('customerName',this.orderList,stringVal);
    this.p = 1;
    this.total = this.orderSearch.length;
    
  }
  /** Search By Date */
  searchDate(event:any,type:any){
   console.log(event)
    this.searchReqDate =  this.datepipe.transform(event,'yyyy-MM-dd');
    this.orderSearch = this.searchString.transform('requestedDate',this.commonOrderSearch,this.searchReqDate);
    this.p = 1;
    this.total = this.orderSearch?.length;
   console.log(this.searchReqTime,this.dateSearch)
  //  const searchValue =event.target.value.replace(/^\s+|\s+$/gm,'');
   
  }
  
  /** Search By Date */
  citySearch(event:any){
    const searchValue =event.target.value.replace(/^\s+|\s+$/gm,'')
    this.orderSearch = this.searchString.transform('deliverycity',this.commonOrderSearch,searchValue);
    this.p = 1;
    this.total = this.orderSearch.length;
  }
  /** Search By Date */
  statusSearch(event:any){
    const searchValue =event.target.value.replace(/^\s+|\s+$/gm,'')
    this.orderSearch = this.searchString.transform('salesStatus',this.commonOrderSearch,searchValue);
    this.p = 1;
    this.total = this.orderSearch.length;
  }
  /** Search By PaymentSearch */
  paymentStatusSearch(event:any){
    const searchValue =event.target.value.replace(/^\s+|\s+$/gm,'')
    this.orderSearch = this.searchString.transform('paymentMode',this.commonOrderSearch,searchValue);
    this.p = 1;
    this.total = this.orderSearch.length;
  }
  /** Export Orders */
  exportAllOrders(){
    this.orderService.exportCsvFile().subscribe(res=>{
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
  /** Export Single Orders */
  exportSingleByOrdersId(ID:any){
    this.orderService.exportSingleCsvFile(ID).subscribe(res=>{
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

  /** Product Details */
  viewOrderProductsDetails(data:any){
   this.orderItems = data;
   console.log(data)
  }

  /** Send Email Invoice */
  emailInvoiceData(data:any){
   this.viewOrderInvoiceData = data;
  }
  emailInvoice(){
   // this.spinner.show();
   this.orderService.sendEmailEnvoice(this.viewOrderInvoiceData.salesOrderId,this.viewOrderInvoiceData.userId).subscribe(res=>{
    if(res.success){
      this.spinner.hide();
     this.toastr.success(res.message);
     //this.router.navigate(["/notifications"]);
  }else{
    this.toastr.success(res.message);
  }
   })
  }
  
  searchTimeDateData(event:any){
    
    let orderData: any;
    let orderDateObj: Array<any> = [];
    let getTimes: any;
    this.submitted = true;
    this.timeSearchOrderData = [];
    let that = this;
    let fromTime:any = this.datepipe.transform('Apr 4, 2022,'+this.searchDateTimeForm.value.fromTime,'HH:mm');
    let toTime = this.datepipe.transform('Apr 4, 2022,'+this.searchDateTimeForm.value.endTime,'HH:mm');
    // stop here if form is invalid
    if (this.searchDateTimeForm.invalid) {
      return;
    }
    this.spinner.show();
    console.log(this.datepipe.transform('Apr 4, 2022,'+this.searchDateTimeForm.value.fromTime,'HH:mm'),this.searchDateTimeForm.value.endTime)
    // this.searchReqDate =  this.datepipe.transform(this.searchDateTimeForm.value.fullDate,'yyyy-MM-dd');
    // orderData = this.searchString.transform('requestedDate',this.orderList,this.searchReqDate);
   let fromDate:any =  this.datepipe.transform(this.searchDateTimeForm.value.fromDate,'yyyy-MM-dd');
   let toDate:any =  this.datepipe.transform(this.searchDateTimeForm.value.toDate,'yyyy-MM-dd');
    this.orderList.forEach((element:any) => {
      let requestedDate:any = this.datepipe.transform(element.requestedDate,'yyyy-MM-dd')
      if(requestedDate >= fromDate && requestedDate <= toDate){
        orderDateObj.push(element)
      }
    });
    console.log(orderDateObj)
    orderDateObj.forEach((element:any) => {
       getTimes = this.datepipe.transform(element.requestedDate,'HH:mm');
       console.log(getTimes)
       getTimes = this.timeStringToFloat(getTimes)
       console.log(getTimes)
      if(getTimes > this.timeStringToFloat(fromTime) && getTimes < this.timeStringToFloat(toTime)){
        console.log(element)
        this.timeSearchOrderData.push(element)
      }
    });
    console.log(this.timeSearchOrderData);
    this.orderSearch = this.timeSearchOrderData; 
    this.commonOrderSearch = this.orderSearch;
    //this.orderList = this.timeSearchOrderData;
    this.p = 1;
    this.total = this.orderSearch.length;
    setTimeout(function () {
      that.spinner.hide();
     }, 1000);
    
    
  }

  timeStringToFloat(time:any) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }

 

 
  
}
