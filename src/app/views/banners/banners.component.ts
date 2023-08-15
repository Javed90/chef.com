import { Component, NgZone, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { BannerService } from 'src/app/_services/banner.service';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  bannerID: any;
  bannerList:any;
  bannerListWithSearch:any;
  p: number = 1;
  total: any;
  imagePath: string = environment.imagePath;

  constructor( private bannerService: BannerService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private zone: NgZone,
    private serchString: SearchStringPipe) { }

  ngOnInit(): void {
    this.getBannerList();
  }

/** Get Banner List */
  getBannerList(){
    this.spinner.show();
    this.bannerService.getAllBanners().subscribe(res=>{
      this.bannerList = res.items;
      this.bannerListWithSearch = res.items;
      this.total = res.items.length;
      this.spinner.hide();
    })
  }

  /** Delet banner */
  openDeletePopup(ID:any){
    this.bannerID = "";
    this.bannerID = ID;
    console.log(this.bannerID);
  }
  bannerDelete(){
    const that = this;
    this.bannerService.deletebanner(this.bannerID).subscribe(res=>{
      if(res.success){
        that.zone.run(()=>{this.getBannerList()})
        this.toastr.success(res.message);
      }else{
        this.toastr.success(res.message);
      }
    })
  }

  bannerTypeSearch(event:any){
   const stringVal = event.target.value.replace(/^\s+|\s+$/gm,'');
   this.bannerListWithSearch = this.serchString.transform('featureBannerType',this.bannerList,stringVal);
   this.p = 1;
   this.total = this.bannerListWithSearch.length;
  }

}