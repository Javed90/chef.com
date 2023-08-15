import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AverageOrderValueComponent } from './average-order-value/average-order-value.component';
import { CustomerDetailComponent } from './customer-over-time/customer-detail/customer-detail.component';
import { CustomerOverTimeComponent } from './customer-over-time/customer-over-time.component';
import { HomeComponent } from './home.component';
import { OrdersOverTimeComponent } from './orders-over-time/orders-over-time.component';
import { SalesByDiscountComponent } from './sales-by-discount/sales-by-discount.component';
import { SalesByProductsComponent } from './sales-by-products/sales-by-products.component';
import { SalesOverTimeComponent } from './sales-over-time/sales-over-time.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'customer-over-time',
    component: CustomerOverTimeComponent,
  },
  {
    path: 'customer-details',
    component: CustomerDetailComponent,
  },
  {
    path: 'sales-by-discount',
    component: SalesByDiscountComponent
  },
  {
    path: 'sales-by-products',
    component: SalesByProductsComponent
  },
  {
    path: 'sales-over-Time',
    component: SalesOverTimeComponent
  },
  {
    path: 'orders-over-time',
    component: OrdersOverTimeComponent
  },
  {
    path: 'average-order-value',
    component: AverageOrderValueComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
