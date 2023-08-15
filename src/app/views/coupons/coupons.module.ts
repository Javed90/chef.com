import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CouponsRoutingModule } from './coupons-routing.module';
import { CouponsComponent } from './coupons.component';
import { AddCouponsComponent } from './add-coupons/add-coupons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    CouponsComponent,
    AddCouponsComponent
    
  ],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    ReactiveFormsModule,
    NgxAutocompleteModule,
    FormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ImageCropperModule
  ],
  providers:    [ SearchStringPipe,DatePipe ]
})
export class CouponsModule { }
