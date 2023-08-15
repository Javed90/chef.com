import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    TimepickerModule.forRoot(),
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
  ],
  providers:    [ SearchStringPipe,DatePipe ]
})
export class OrdersModule { }
