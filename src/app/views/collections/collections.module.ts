import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    CollectionsComponent,
    AddCollectionComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ImageCropperModule
  ],
  providers:    [ SearchStringPipe,DatePipe ]
})
export class CollectionsModule { }
