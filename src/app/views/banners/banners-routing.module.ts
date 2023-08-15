import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { BannersComponent } from './banners.component';
import { SingleBannerComponent } from './single-banner/single-banner.component';

const routes: Routes = [
  {
    path: '',
    component: BannersComponent
  },
  {
    path: 'add',
    component: AddBannerComponent
  },
  {
    path: 'edit/:id',
    component: AddBannerComponent
  },
  {
    path: 'detail/:id',
    component: SingleBannerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannersRoutingModule { }
