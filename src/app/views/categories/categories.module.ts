import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';
import { SubCategoriesDetailComponent } from './sub-categories-detail/sub-categories-detail.component';
import { SubSubCategoriesDetailComponent } from './sub-sub-categories-detail/sub-sub-categories-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    
  
    CategoriesComponent,
            AddCategoryComponent,
            CategoriesDetailComponent,
            SubCategoriesDetailComponent,
            SubSubCategoriesDetailComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ImageCropperModule
  ],
  providers:    [ SearchStringPipe,DatePipe ]
})
export class CategoriesModule { }
