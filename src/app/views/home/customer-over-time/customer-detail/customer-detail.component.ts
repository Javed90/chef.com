import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customerObj: any;
  customersList:any;
  customersListWihtSearch: any;
  total:any;
  p:any;
  filePath:string = environment.imagePath;
  constructor(private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private dashboardService: DashboardService,
    public datepipe: DatePipe,
    private searchString: SearchStringPipe,
    ) { }

  ngOnInit(): void {
    this.customersData();
  }
  customersData(){
    this.spinner.show();
    this.dashboardService.currentObject.subscribe(res=> this.customerObj = res);
    console.log(this.customerObj)
    this.dashboardService.sendCustomerDetailsFromTo(this.customerObj);
    if(this.customerObj){
      this.getCustomersData(this.customerObj);
    }else{
      const data:any = this.dashboardService.getCustomerDetails();
      this.customersList = JSON.parse(data);
      this.customersListWihtSearch = JSON.parse(data);
      this.customersListWihtSearch = this.customersListWihtSearch;
      this.total = this.customersListWihtSearch.length;
      this.sortByCustomers('new',this.customersListWihtSearch);
      this.spinner.hide();
      console.log(this.customersList);
    }
  }
  getCustomersData(data:any){
    const val = {fromDate: data.fromDate,toDate: data.toDate}
    this.dashboardService.customersDetails(val).subscribe(res=>{
      console.log(res);
      this.dashboardService.clearCustomerDetails();
      this.dashboardService.sendCustomerDetails(res.data);
      this.customersList = res.data;
      this.customersListWihtSearch = res.data;
      this.total = this.customersListWihtSearch.length;
      this.sortByCustomers('new',this.customersListWihtSearch);
      this.spinner.hide();
      console.log(this.customersList);
    })
  }

  /** Search by customer name */
  typeBySearch(event:any,type:any){
    //const stringVal =event.target.value.replace(/^\s+|\s+$/gm,'')
    const stringVal = event.target.value.split(" ");
    const firstName = stringVal[0];
    const lastName = stringVal[1];
    if(lastName){
      this.customersListWihtSearch = this.searchString.transform('lastName',this.customersListWihtSearch,lastName);
    }else{
      this.customersListWihtSearch = this.searchString.transform(type,this.customersList,firstName);
    }
    
    this.p = 1;
    this.total = this.customersListWihtSearch.length;
  }
  /** Exports All Customers */

  exportAllCustomers(){
    let getData:any = this.dashboardService.getCustomerDetailsFromTo();
    getData = JSON.parse(getData);
    console.log(getData)
    const data = {downloadReport: true,fromDate: getData.fromDate,toDate: getData.toDate}
    this.dashboardService.customersDetails(data).subscribe(res=>{
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
  /** Sort By Date */
  sortByDate(event:any,type:any){
    let data:any = this.dashboardService.getCustomerDetails();
    let that = this
    data = JSON.parse(data);
    
    console.log(event.target.value,type)
    if(type == "customerCreationDate"){
       this.sortByCustomers(event.target.value,data);
    }else if(type == "lastOrderDate"){
      this.sortByLastOrders(event.target.value,data);
    }else if(type == "totalSpents"){
      this.sortByAmountSpent(event.target.value,data);
    }
    
    console.log(this.customersListWihtSearch)
    this.p = 1;
    this.total = this.customersListWihtSearch.length;
  }

  sortByCustomers(event:any,data:any){
    if(event == 'new'){
      this.customersListWihtSearch =  data.sort(function (a:any, b:any) {
        return new Date(b.customerCreationDate).getTime() - new Date(a.customerCreationDate).getTime();
      });
    }else if(event == 'old'){
      this.customersListWihtSearch =  data.sort(function (a:any, b:any) {
        return new Date(a.customerCreationDate).getTime() - new Date(b.customerCreationDate).getTime();
      });
    }
  }

  sortByLastOrders(event:any,data:any){
    console.log(event)
    if(event == 'new'){
      this.customersListWihtSearch =  data.sort(function (a:any, b:any) {
        return new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime();
      });
    }else if(event == 'old'){
      this.customersListWihtSearch =  data.sort(function (a:any, b:any) {
        return new Date(a.lastOrderDate).getTime() - new Date(b.lastOrderDate).getTime();
      });
    }
  }

  sortByAmountSpent(event:any,data:any){
    if(event == 'high'){
      this.customersListWihtSearch =  data.sort(function (a:any, b:any) {
        return  b.totalSpents - a.totalSpents;
      });
    }else if(event == 'low'){
      this.customersListWihtSearch =  data.sort(function (a:any, b:any) {
        return a.totalSpents - b.totalSpents;
      });
    }
  }
}
