import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customersList:Array<any> = [];
  customersListWihtSearch: any;
  total: any;
  p: number = 1;
  filePath:string = environment.imagePath;
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private dashboardService: DashboardService,
    public datepipe: DatePipe,
    private searchString: SearchStringPipe,
  ) { }

  ngOnInit(): void {
    const data = {downloadReport: false}
    this.getCustomerList(data);
  }

  /** Get Customer List */
  getCustomerList(data:any){
    this.spinner.show();
    this.dashboardService.clearCustomerListData();
    this.dashboardService.customerList(data).subscribe(res=>{
      //this.customersList = res.items;
      res.items.forEach((element:any) => {
        element.customerName = element.firstName+" "+element.lastName;
        this.customersList.push(element);
      });
      this.dashboardService.sendCustomerListData(this.customersList)
      this.sortByCustomers('new',this.customersList);
      this.total = this.customersList.length;
      this.spinner.hide();
    })
  }

  /** Search by customer name */
  typeBySearch(event:any,type:any){
   
    const stringVal = event.target.value
    this.customersListWihtSearch = this.searchString.transform('customerName',this.customersList,stringVal);
    this.p = 1;
    this.total = this.customersListWihtSearch.length;
  }
  /** Exports All Customers */

  exportAllCustomers(){
    const data = {downloadReport: true}
    this.dashboardService.customerList(data).subscribe(res=>{
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
    let data:any = this.dashboardService.getCustomerListData();
    let that = this
    data = JSON.parse(data);
    
    console.log(event.target.value,type)
    if(type == "isCustomerNew"){
       this.sortByoldNew(event.target.value,data);
    }else if(type == "lastOrderDate"){
      this.sortByLastOrders(event.target.value,data);
    }else if(type == "totalSpents"){
      this.sortByAmountSpent(event.target.value,data);
    }
    
    console.log(this.customersListWihtSearch)
    this.p = 1;
    this.total = this.customersListWihtSearch.length;
  }
  sortByoldNew(event:any,data:any){
    let customers = this.searchString.transform('isCustomerNew',data,event);
    this.sortByLastOrders('new',customers)
   
    

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
