import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router,NavigationStart, Event as NavigationEvent, ActivatedRoute, NavigationEnd   } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommoncontactService } from 'src/app/_services/commoncontact.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  
  classActives: any = 'dashboard';
  addEditPrompt: any;
  modalRef!: BsModalRef;
  routesLinks: any;
  activeClass:any;
  constructor(private router: Router,private activatedRoute: ActivatedRoute,private commonService: CommoncontactService,private modalService: BsModalService) {}

  ngOnInit(): void {
    // this.router.events
    //       .subscribe(
    //         (event: NavigationEvent) => {
    //           if(event instanceof NavigationStart) {
    //             const url = event.url.split('/')
    //            // console.log(url)
    //             this.classActives = event.url.replace("edit", "");
    //             this.classActives = this.classActives.replace("add", "");
    //             this.classActives = this.classActives.replace("detail", "");
    //             this.classActives = this.classActives.replace(/\//g, "");
    //              this.classActives = this.classActives.replace(/[0-9]/g, '');
    //             if(this.classActives == ''){
    //               this.classActives = 'dashboard';
    //             }
    //           }
    //         });
    this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationStart) {
                const url = event.url.split('/')
                if(url[2]){
                  this.addEditPrompt = url[2];
                  console.log(this.addEditPrompt);
                }
                
              }
            })
  }

  activateSavedLink(){
    this.classActives = this.commonService.getActiveClass();
    if(this.classActives == ""){
      this.classActives = "dashboard"
    }
  }

  ngDoCheck() {
    this.activateSavedLink();
  }

  classActive(data:any,template: TemplateRef<any>,links:any){
    this.routesLinks = links;
    this.activeClass = data;
    if((this.addEditPrompt == 'edit' || this.addEditPrompt == 'add') && (localStorage.getItem('isFormChanged') == 'true')){
      this.modalRef = this.modalService.show(template);
    }else{
      this.classActives = this.activeClass;
      if(this.routesLinks != 'settings'){
        this.router.navigate([this.routesLinks]);
      }
    }
  }
  redirectUrl(){
   this.classActives = this.activeClass;
   this.addEditPrompt = '';
   this.modalRef.hide();
   localStorage.removeItem("isFormChanged");
   if(this.routesLinks != 'settings'){
    this.router.navigate([this.routesLinks]);
   }
  
   
  }
  settings(event:any){
    event.stopPropagation()
  }
}
