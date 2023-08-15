import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';


@NgModule({
  declarations: [
    CustomersComponent,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    NgxPaginationModule,
  ],
  providers:    [ SearchStringPipe,DatePipe ]
})
export class CustomersModule { }
