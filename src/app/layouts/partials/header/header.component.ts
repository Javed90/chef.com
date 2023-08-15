import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
  }
  logout(){
   this.userService.logout();
   localStorage.clear();
   this.toastr.success('Logout successfully');
  
   this.zone.run(()=>{
    this.router.navigate(["/login"]);
   })

  }

}
