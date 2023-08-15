import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BannerDetail } from 'src/app/_interfaces/bannerDetail.model';
import { BannerService } from 'src/app/_services/banner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-banner',
  templateUrl: './single-banner.component.html',
  styleUrls: ['./single-banner.component.css']
})
export class SingleBannerComponent implements OnInit {

  bannerId:any;
  // bannerData: any;
  imagePath: string = environment.imagePath;
  bannerData: BannerDetail = new BannerDetail();

  constructor(
    private bannerService: BannerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.bannerId = param['id'];
      this.getBannerDetail(this.bannerId)
  });
  }

  getBannerDetail(bannerId:any){
    this.bannerService.bannerDetail(bannerId).subscribe(res=>{
      this.bannerData = res.data;
     })
  }
}
