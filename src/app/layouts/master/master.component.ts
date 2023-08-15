import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { CommoncontactService } from 'src/app/_services/commoncontact.service';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  public href: string = "";
  public url: boolean = true;
  classActive:any;
  constructor(private route: ActivatedRoute,private redirectRoute: Router,private commonService: CommoncontactService) { }

  ngOnInit(): void {
    this.commonService.clearActiveClass();
    this.redirectRoute.events.subscribe(res=>{
      if (res instanceof NavigationEnd  ) {
        this.href = res.url
        this.href = this.href.replace('/','');
        this.classActive = res.url.split('/');
        if(this.href == 'login' || this.href == 'register' || this.href == 'forgot-password'|| this.href == 'change-password'|| this.href == 'otp'|| this.href == '**'){
          this.url = true;
        }else{
          this.url = false;
        }
        console.log("=== === >> ", this.classActive)
        this.commonService.sendActiveClass(this.classActive[1]);
        
        console.log(this.href,this.classActive[1])
      }
    })
  }
  onActivateEvent(event :Event) {
    window.scroll(0,0);

  }
}
