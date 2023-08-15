import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RejectedOrdersComponent } from './rejected-orders.component';

const routes: Routes = [
  {
    path: '',
    component: RejectedOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RejectedOrdersRoutingModule { }
