import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { CommoncontactService } from 'src/app/_services/commoncontact.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationList: any;
  p: number = 1;
  total: any;
  notificationSearch: any;
  notificationDeleteId:any;
  constructor(
    private spinner: NgxSpinnerService,
     private toastr: ToastrService,
     private router: Router,
     private zone: NgZone,
     private serchString: SearchStringPipe,
     private notificationService: CommoncontactService
  ) { }

  ngOnInit(): void {
   this.notifications();
  }

  notifications(){
    this.spinner.show();
    this.notificationService.notificationsList().subscribe(res=>{
      this.notificationList = res.items;
      this.notificationSearch = res.items;
      this.total = this.notificationSearch.length;
      
      this.spinner.hide();
    })
  }

  /** Search By collection Type */

  notificationsSearch(event:any){
    const stringVal = event.target.value.replace(/^\s+|\s+$/gm,'');
    console.log(stringVal)
    this.notificationSearch = this.serchString.transform('title',this.notificationList,stringVal);
    this.p = 1;
    this.total = this.notificationSearch.length;
    
  }

 /** get Delete ID */

 deletenotification(ID:any){
  this.notificationDeleteId = ID;
 }
 deleteData(){
   this.notificationService.deleteNotification(this.notificationDeleteId).subscribe(res=>{
     if(res.success){
       this.zone.run(()=>{
         this.notifications();
       })
        this.toastr.success(res.message);
        this.router.navigate(["/notifications"]);
     }else{
       this.toastr.success(res.message);
     }
   })
   
   
 }

}
