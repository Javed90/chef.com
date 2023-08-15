import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgChartsModule } from 'ng2-charts';
import { SalesOverTimeComponent } from './sales-over-time/sales-over-time.component';
import { SalesByProductsComponent } from './sales-by-products/sales-by-products.component';
import { SalesByDiscountComponent } from './sales-by-discount/sales-by-discount.component';
import { CustomerOverTimeComponent } from './customer-over-time/customer-over-time.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { OrdersOverTimeComponent } from './orders-over-time/orders-over-time.component';
import { AverageOrderValueComponent } from './average-order-value/average-order-value.component';
import { CustomerDetailComponent } from './customer-over-time/customer-detail/customer-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    SalesOverTimeComponent,
    SalesByProductsComponent,
    SalesByDiscountComponent,
    CustomerOverTimeComponent,
    OrdersOverTimeComponent,
    AverageOrderValueComponent,
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgChartsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  providers:    [ SearchStringPipe,DatePipe ]
})
export class HomeModule { }
