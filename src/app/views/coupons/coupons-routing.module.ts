import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCouponsComponent } from './add-coupons/add-coupons.component';
import { CouponsComponent } from './coupons.component';

const routes: Routes = [
  {
    path: '',
    component: CouponsComponent
  },
  {
    path: 'add',
    component: AddCouponsComponent
  },
  {
    path: 'edit/:id',
    component: AddCouponsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule { }
