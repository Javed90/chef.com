import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartConfiguration, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/_services/dashboard.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   barChartOptions: ChartOptions = {
    responsive: true,
  };
  /** BarChart option for pie charts */
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        // formatter: (value, ctx) => {
        //   if (ctx.chart.data.labels) {
        //     return ctx.chart.data.labels[ctx.dataIndex];
        //   }
        // },
        align:"end",
        clamp: true,
        rotation:70,
        padding: 10,
        
      },
    
    }
  };
  pieChartPlugins = []; 
   barChartLabelsData : Array<any>  = [];
   barChartLabels: Array<any>  = [];
   barChartType: ChartType = 'line';
   barChartLegend = true;
   barChartPlugins = [];    
  
   barChartData: ChartDataset[] = [
    { data: [], label: 'Sales YTD',borderColor: '#a2303d',backgroundColor: '#a2303d',pointBackgroundColor: '#a2303d' }
  ];
  /** Sales By Products */
  barChartLabels2: any  =  [];
  barChartData2: ChartDataset[] = [
    { data: [] }
  ];
  barChartType2: ChartType = 'pie';
  /** Labels for Orders Over Time */
  barChartLabels3: any  = [];
  barChartData3: ChartDataset[] = [
    { data: [], label: 'Total Orders',borderColor: '#9C182F',backgroundColor: '#9C182F',pointBackgroundColor: '#9C182F' },
    { data: [], label: 'Total Items' }
  ];
  barChartType3: ChartType = 'line';
   /** Labels for Coustomer Over Time */
   barChartLabels4: any  = [];
   barChartData4: ChartDataset[] = [
     { data: [], label: 'Customer Growth',borderColor: '#9C182F',backgroundColor: '#9C182F',pointBackgroundColor: '#9C182F' },
   ];
   barChartType4: ChartType = 'line';
    /** Labels for Average Order Value */
    barChartLabels5: any  = [];
    barChartData5: ChartDataset[] = [
      { data: [], label: 'Orders Average Value',borderColor: '#9C182F',backgroundColor: '#9C182F',pointBackgroundColor: '#9C182F' },
      { data: [], label: 'Total Orders' }
    ];
    barChartType5: ChartType = 'line';

    /** Labels for customers by  REVENUE */
    radarChartOptions: ChartConfiguration['options'] = {
      responsive: true,
    };
    barChartLabels6: any  = [];
    barChartData6: ChartDataset[] = [
      { data: [], label: 'Total Orders',borderColor: '#9C182F',backgroundColor: '#9C182F',pointBackgroundColor: '#9C182F' },
      { data: [], label: 'Total Amount' }
    ];
    barChartType6: ChartType = 'bar';
    /** Labels for Brands By Revenue */
    barChartLabels7: any  = [];
    barChartData7: ChartDataset[] = [
      { data: [], label: 'Total Orders',borderColor: '#9C182F',backgroundColor: '#9C182F',pointBackgroundColor: '#9C182F' },
      { data: [], label: 'Total Amount' }
    ];
    barChartType7: ChartType = 'bar';
     /** Labels for Brands By Revenue */
     barChartLabels8: any  = [];
     barChartData8: ChartDataset[] = [
       { data: [], label: 'Total Orders',borderColor: '#9C182F',backgroundColor: '#9C182F',pointBackgroundColor: '#9C182F' },
       { data: [], label: 'Total Amount' }
     ];
     barChartType8: ChartType = 'line';
      /** Labels for Users Count  */
      barChartLabels9: any  = [];
      barChartData9: ChartDataset[] = [
        { data: [], label: 'Total Users' },

      ];
      barChartType9: ChartType = 'pie';
/** Date Variable */
   maxDate = new Date();
   minDate = new Date();
   currentTime = new Date()
   minDateFromMaxdate = new Date()
   fromDate:any;

  // returns the month (from 0 to 11)
  month = this.currentTime.getMonth() + 1
  
  // returns the day of the month (from 1 to 31)
  day = this.currentTime.getDate()
  // returns the year (four digits)
  year = this.currentTime.getFullYear();
  lastYearMonth = this.currentTime.getMonth() + 3
  
  lastYear = this.currentTime.getFullYear() - 1;
  dateData:any;
  dateData2: any;
  dateData3: any;
  dateData4: any;
  dateData5: any;
  dateData6: any;
  /** forms variables */
   dashBoardForm!: FormGroup;
   dashBoardForm2!: FormGroup;
   dashBoardForm3!: FormGroup;
   dashBoardForm4!: FormGroup;
   dashBoardForm5!: FormGroup;
   dashBoardForm6!: FormGroup;
   submitted: boolean = false;
   submitted2: boolean = false;
   submitted3: boolean = false;
   submitted4: boolean = false;
   submitted5: boolean = false;
   submitted6: boolean = false;
   saleOverTimeData: any;
   custOverTimeData:any;
   ordersOTimeData:any;
   averageOVData: any;
   customerBRData: Array<any> = [];
   brandsBRData: Array<any> = [];
   categoriesBRData: Array<any> = [];
   usersCountData: Array<any> = [];
   /** sale by product */
   salesByProdData: Array<any> = [];
   salesByDisData: Array<any> = [];
   /**Loadder image */
   isLoaderImage: boolean = false;
   isLoaderImage1: boolean = false;
   isLoaderImage2: boolean = false;
   isLoaderImage5: boolean = false;
   isLoaderImage4: boolean = false;

   @ViewChild('name') inputName:any;
   @ViewChild('name2') inputName2:any;
  constructor( private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.multipleForms();
    this.getDateParams();
    this.commonObj();
    
    
  }
  /** hit all functions */
  commonObj(){
    this.brandsByRevenueData(this.dateData);
    this.categoriesByRevenueData(this.dateData);
    this.customerByRevenueData(this.dateData);
    this.salesOverTimeData(this.dateData);
    this.salesByProductsData(this.dateData);
    this.customerOverData(this.dateData);
    this.salesByDiscountData(this.dateData);
    this.OrdersOverTimeData(this.dateData);
    this.averageOrderValueData(this.dateData);
    this.registeredGuestCountData(this.dateData);
  }
  getDateParams(){
    console.log(this.month,this.day,this.lastYearMonth,this.lastYear)
    // if(this.month == 11){
    //   this.lastYearMonth = 1;
    //   this.lastYear = this.year + 1;
    // }else if(this.month == 12){
    //   this.lastYearMonth = 2;
    //   this.lastYear = this.lastYear + 1;
    // }
    
   this.dateData = {fromDate: this.year+"-01-01T04:10:32.066Z",toDate: this.year+"-"+this.month+"-"+this.day+"T04:10:32.066Z" }
  }
  /** MultipleForms */
  multipleForms(){
    this.dashBoardForm = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
    });
    /** sales By Products */
    this.dashBoardForm2 = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
    });
    /**Sales By Discount */
    this.dashBoardForm3 = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
    });
    /**Custom Over Time */
    this.dashBoardForm4 = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
    });
    /**Order Over Time */
    this.dashBoardForm5 = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
    });
    /**Average Order Value */
    this.dashBoardForm6 = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
    });
  }
/** sale over time */
get f() { return this.dashBoardForm['controls']; }
get s() { return this.dashBoardForm2['controls']; }
get d() { return this.dashBoardForm3['controls']; }
get c() { return this.dashBoardForm4['controls']; }
get o() { return this.dashBoardForm5['controls']; }
get a() { return this.dashBoardForm6['controls']; }
  /** Send Object */
  sendObject(item:any){
    // if(this.dateData2 != this.dateData4){
    //   this.dateData2 = this.dateData4;
    // }
    this.dashboardService.changeObject(this.dateData);
  }
/** Send Object for discount */
sendObjectForDiscount(item:any){
  this.dashboardService.changeObject(this.dateData);
}
/** Send Object for Order Over Time */
sendObjectForOrder(item:any){
  this.dashboardService.changeObject(this.dateData);
}
/** Send Object for Averager Order Value */
sendObjectForAvg(item:any){
  this.dashboardService.changeObject(this.dateData);
}
  /** Sale over Time  */
  submit(event:any){
    this.submitted = true;
    // stop here if form is invalid
    if (this.dashBoardForm.invalid) {
        return;
    }
    this.dateData = this.dashBoardForm.value;
      this.salesOverTimeData(this.dashBoardForm.value);
      this.salesByProductsData(this.dashBoardForm.value);
      this.salesByDiscountData(this.dashBoardForm.value);
      this.customerOverData(this.dashBoardForm.value);
      this.OrdersOverTimeData(this.dashBoardForm.value);
      this.averageOrderValueData(this.dashBoardForm.value);
      this.brandsByRevenueData(this.dashBoardForm.value);
      this.categoriesByRevenueData(this.dashBoardForm.value);
      this.customerByRevenueData(this.dashBoardForm.value);
      this.registeredGuestCountData(this.dashBoardForm.value);
  }
  /** Sale By Products  */
  submit2(event:any){
    this.submitted2 = true;
    // stop here if form is invalid
    if (this.dashBoardForm2.invalid) {
        return;
    }
    this.dateData2 = this.dashBoardForm2.value;
    this.isLoaderImage = true;
      this.salesByProductsData(this.dashBoardForm2.value);
  }
  /** Discount Over Time  */
  submit3(event:any){
    this.submitted3 = true;
    // stop here if form is invalid
    if (this.dashBoardForm3.invalid) {
        return;
    }
    this.isLoaderImage1 = true;
    this.dateData3 = this.dashBoardForm3.value;
      this.salesByDiscountData(this.dashBoardForm3.value);
  }
  /** Customer Over Time  */
  submit4(event:any){
    this.submitted4 = true;
    // stop here if form is invalid
    if (this.dashBoardForm4.invalid) {
        return;
    }
    this.dateData4 = this.dashBoardForm4.value;
    this.isLoaderImage2 = true;
      this.customerOverData(this.dashBoardForm4.value);
  }
  /** Order Over Time  */
  submit5(event:any){
    this.submitted5 = true;
    // stop here if form is invalid
    if (this.dashBoardForm5.invalid) {
        return;
    }
    this.isLoaderImage5 = true;
    this.dateData5 = this.dashBoardForm5.value;
      this.OrdersOverTimeData(this.dashBoardForm5.value);
  }
  /** Average Order Value  */
  submit6(event:any){
    this.submitted6 = true;
    // stop here if form is invalid
    if (this.dashBoardForm6.invalid) {
        return;
    }
    this.dateData6 = this.dashBoardForm6.value;
    this.isLoaderImage4 = true;
      this.averageOrderValueData(this.dashBoardForm6.value);
  }
  /** Sales Over Time Get Data */
  salesOverTimeData(data:any){
    this.dashboardService.clearSalesOverTime();
    this.spinner.show();
    this.dashboardService.salesOverTime(data).subscribe((res:any)=>{
      if(res.success){
        this.dashboardService.sendSalesOverTime(res.data);
        if(res.data.salesOverTimeGraphResponse != null){
          this.saleOverT();
        }else{
          this.saleOverTimeData = []
          this.barChartLabels = []
          this.barChartData[0].data = [];
        }
        this.spinner.hide();
      }
    })
  }
  saleOverT(){
    let that = this;
    let totalAmount;
    let saleData:any = that.dashboardService.getSalesOverTime();
    that.saleOverTimeData = JSON.parse(saleData);
    // let val = that.getUniqueListBy(that.saleOverTimeData.salesOverTimeGraphResponse,'month');

    that.barChartLabels = []
    that.barChartData[0].data = [];
    that.saleOverTimeData.salesOverTimeGraphResponse.forEach((element:any) => {
      if(element.totalAmount == null){
      totalAmount = 0
      }else{
        totalAmount = element.totalAmount
      }
      that.barChartData[0].data.push(totalAmount);
      that.barChartLabels.push(element.month)
      if(element.type == 'Years'){
        that.barChartType = "bar"
      }else{
        that.barChartType = "line"
      }
    });
  }
/**Sales By Products */
salesByProductsData(data:any){
  this.spinner.show();
  this.dashboardService.clearProductData();
  data['downloadReport'] = false
  this.dashboardService.salesOverProducts(data).subscribe((res:any)=>{
    if(res.success){
      this.isLoaderImage = false;
      this.dashboardService.sendProductData(res.data);
      this.saleOverProducts()
      this.spinner.hide();
    }else{
      this.salesByProdData = [];
      this.barChartLabels2 = [];
      this.barChartData2[0].data = [];
    }
  })
}
saleOverProducts(){
  let that = this;
  this.salesByProdData = [];
  let saleProdData:any = this.dashboardService.getProductData();
  saleProdData = JSON.parse(saleProdData);
  
  saleProdData.salesByProducts.forEach((element:any,index:any) => {
    if(index < 10){
    this.salesByProdData.push(element)
    }
  });
  that.barChartLabels2 = []
  that.barChartData2[0].data = [];
  this.salesByProdData.forEach((element:any) => {
    that.barChartData2[0].data.push(element.totalSales);
    that.barChartLabels2.push(element.productName)
  });

}

/** customOverData */
customerOverData(data:any){
  this.dashboardService.clearCustomerOverTime();
  this.dashboardService.customerOverTime(data).subscribe((res:any)=>{
    if(res.success){
      this.isLoaderImage2 = false;
      this.dashboardService.sendCustomerOverTime(res.data);
      this.customerOTime();
    }
  })
}
customerOTime(){
  let that = this;
  let saleData:any = that.dashboardService.getCustomerOverTime();
  that.custOverTimeData = JSON.parse(saleData);
  // let val = that.getUniqueListBy(that.custOverTimeData.graphResponse,'month');
  that.barChartLabels4 = []
  that.barChartData4[0].data = [];
  that.custOverTimeData.graphResponse.forEach((element:any) => {
    that.barChartData4[0].data.push(element.totalCustomer);
    that.barChartLabels4.push(element.month)
    if(element.type == 'Years'){
      that.barChartType4 = "bar"
    }else{
      that.barChartType4 = "line"
    }
  });
}

/**Sales By Discount */
salesByDiscountData(data:any){
  this.dashboardService.clearDiscountData();
  this.dashboardService.salesByDiscount(data).subscribe((res:any)=>{
    if(res.success){
      this.isLoaderImage1 = false;
      this.dashboardService.sendDiscountData(res.data);
      this.salesDiscount();
    }
  })
}
salesDiscount(){
  this.salesByDisData = [];
  let discountData:any = this.dashboardService.getDiscountData();
  discountData = JSON.parse(discountData);
  discountData.forEach((element:any,index:any) => {
    if(index < 10){
    this.salesByDisData.push(element)
    }
  });

}
/** Orders Over Time Get Data */
OrdersOverTimeData(data:any){
  this.dashboardService.clearOrdersOTData();
  this.dashboardService.orderOverTime(data).subscribe((res:any)=>{
    if(res.success){
      this.isLoaderImage5 = false;
      this.dashboardService.sendOrdersOTData(res.data);
      if(res.data.graphResponse != null){
        this.OrdersOverT();
      }else{
        this.ordersOTimeData = [];
        this.barChartLabels3 = [];
        this.barChartData3[0].data = [];
        this.barChartData3[1].data = [];
      }
      
    }
  })
}
OrdersOverT(){
  let that = this;
  let totalOrders;
  let totalItems;
  let saleData:any = that.dashboardService.getOrdersOTData();
  that.ordersOTimeData = JSON.parse(saleData);
  //let val = that.getUniqueListBy(that.ordersOTimeData.graphResponse,'month');
  that.barChartLabels3 = []
  that.barChartData3[0].data = [];
  that.barChartData3[1].data = [];
  that.ordersOTimeData.graphResponse.forEach((element:any) => {
    if(element.totalOrders == null){
      totalOrders = 0
    }else{
      totalOrders = element.totalOrders;
    }
    if(element.totalItems == null){
      totalItems = 0
    }else{
      totalItems = element.totalItems;
    }
    that.barChartData3[0].data.push(totalOrders);
    that.barChartData3[1].data.push(totalItems);
    that.barChartLabels3.push(element.month)
    if(element.type == 'Years'){
      that.barChartType3 = "bar"
    }else{
      that.barChartType3 = "line"
    }
  });
  
}
/** Average Order Value Get Data */
averageOrderValueData(data:any){
  this.dashboardService.clearAverageOVData();
  this.dashboardService.averageOrdersValue(data).subscribe((res:any)=>{
    if(res.success){
      this.isLoaderImage4 = false;
      this.dashboardService.sendAverageOVData(res.data);
      this.averageOderVT();
    }
  })
}
averageOderVT(){
  let that = this;
  let saleData:any = that.dashboardService.getAverageOVData();
  that.averageOVData = JSON.parse(saleData);
  //let val = that.getUniqueListBy(that.averageOVData.graphResponse,'month');
  that.barChartLabels5 = []
  that.barChartData5[0].data = [];
  that.barChartData5[1].data = [];
  that.averageOVData.graphResponse.forEach((element:any) => {
    that.barChartData5[0].data.push(element.averageOrderValue);
    that.barChartData5[1].data.push(element.totalOrders);
    that.barChartLabels5.push(element.month)
    if(element.type == 'Years'){
      that.barChartType5 = "bar"
    }else{
      that.barChartType5 = "line"
    }
  });
  
}

/**customers By Revenue */
customerByRevenueData(data:any){
  this.dashboardService.clearCustomerBRData();
  this.dashboardService.customerByRevenue(data).subscribe((res:any)=>{
    if(res.success){
      this.dashboardService.sendCustomerBRData(res.data);
      this.customerBR();
    }
  })
}
customerBR(){
  let that = this;
  let totalOrders: any;
  let totalAmount: any;
  let saleData:any = that.dashboardService.getCustomerBRData();
  that.customerBRData = JSON.parse(saleData);
  that.barChartLabels6 = []
  that.barChartData6[0].data = [];
  that.barChartData6[1].data = [];
  that.customerBRData.forEach((element:any,index:any) => {
    
    if(index < 10){
      if(element.totalOrders == null){
        totalOrders = 0
      }else{
        totalOrders = element.totalOrders;
      }
      if(element.totalAmount == null){
        totalAmount = 0
      }else{
        totalAmount = element.totalAmount;
      }
      that.barChartData6[0].data.push(totalOrders);
      that.barChartData6[1].data.push(totalAmount);
      that.barChartLabels6.push(element.customerName)
    }
  });
  
}
/**Brands By Revenue */
brandsByRevenueData(data:any){
  this.dashboardService.clearBrandsBRData();
  this.dashboardService.brandsByRevenue(data).subscribe((res:any)=>{
    if(res.success){
      this.dashboardService.sendBrandsBRData(res.data);
      this.brandrBR();
    }
  })
}
brandrBR(){
  let that = this;
  let saleData:any = that.dashboardService.getBrandsBRData();
  that.brandsBRData = JSON.parse(saleData);
  that.barChartLabels7 = []
  that.barChartData7[0].data = [];
  that.barChartData7[1].data = [];
  that.brandsBRData.forEach((element:any,index:any) => {
    if(index < 10){
      that.barChartData7[0].data.push(element.totalOrders);
      that.barChartData7[1].data.push(element.totalAmount);
      that.barChartLabels7.push(element.brand)
    }
  });
}
/**Categories By Revenue */
categoriesByRevenueData(data:any){
  this.dashboardService.clearCategoriesBRData();
  this.dashboardService.categoryByRevenue(data).subscribe((res:any)=>{
    if(res.success){
      this.dashboardService.sendCategoriesBRData(res.data);
      this.categoryBR();
    }
  })
}
categoryBR(){
  let that = this;
  let saleData:any = that.dashboardService.getCategoriesBRData();
  that.categoriesBRData = JSON.parse(saleData);
  that.barChartLabels8 = []
  that.barChartData8[0].data = [];
  that.barChartData8[1].data = [];
  that.categoriesBRData.forEach((element:any,index:any) => {
    if(element.category){
      if(index < 10){
        that.barChartData8[0].data.push(element.totalOrders);
        that.barChartData8[1].data.push(element.totalAmount);
        that.barChartLabels8.push(element.category)
      }
    }
    
  });
}

/**Registered And Guest Users Count */
registeredGuestCountData(data:any){
  this.dashboardService.clearRegisteredUsersData();
  this.dashboardService.usersCount(data).subscribe((res:any)=>{
    if(res.success){
      this.dashboardService.sendRegisteredUsersData(res.data);
      this.usersCount();
    }
  })
}
usersCount(){
  let that = this;
  let saleData:any = that.dashboardService.getRegisteredUsersData();
 // that.usersCountData
  const data = JSON.parse(saleData);
  that.barChartLabels9 = ['Registered User','Guest User'];
  that.barChartData9[0].data = [data.registeredUser,data.guestUser];
  
}
  /** Remove Duplicate Values */
 getUniqueListBy(arr:any, key:any) {
  return [...new Map(arr.map((item:any) => [item[key], item])).values()]
}
/** Get Min Date */

getMinDate(event:any){
  this.minDateFromMaxdate = new Date(event);
}
/** Reset Date */
reset(item:any): any{
  if(item == 'reset'){
    this.inputName.nativeElement.value = '';
    this.inputName2.nativeElement.value = '';
    this.dateData = {fromDate: this.year+"-01-"+this.day+"T04:10:32.066Z",toDate: this.year+"-"+this.month+"-"+this.day+"T04:10:32.066Z" }
    this.commonObj();
  }
  //this.dateSearch = '';
}

}
