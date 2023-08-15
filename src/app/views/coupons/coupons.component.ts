import { Component, NgZone, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { CouponService } from 'src/app/_services/coupon.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  couponData: any;
  couponId:any;
  p: number = 1;
  total: any;
  constructor( private couponService: CouponService,private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private zone: NgZone,
    private serchString: SearchStringPipe, ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.allCouponList();
  }
  openDeletePopup(ID: any){
    this.couponId = "";
    this.couponId = ID;
    console.log(this.couponId);
  }
  couponDelete(){
    const that = this;
    this.couponService.deleteCoupon(this.couponId).subscribe(res=>{
      if(res.success){
        that.zone.run(()=>{this.allCouponList()})
        this.toastr.success(res.message);
      }else{
        this.toastr.success(res.message);
      }
    })
  }
  allCouponList(){
    this.couponService.getCoupon().subscribe(res=>{
      this.couponData = res.item;
      this.total = res.item.length;
      this.spinner.hide();
    })
  }
  /** send Object */

  sendObject(item:any){
    this.couponService.changeObject(item);
  }
}
