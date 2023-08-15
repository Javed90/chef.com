import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    RecipesComponent,
    AddRecipeComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxAutocompleteModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ImageCropperModule
  ],
  providers:    [ SearchStringPipe,DatePipe ]
})
export class RecipesModule { }
