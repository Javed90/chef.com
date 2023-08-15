import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedOrdersComponent } from './accepted-orders.component';

const routes: Routes = [
  {
    path: '',
    component: AcceptedOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceptedOrdersRoutingModule { }
