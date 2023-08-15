import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersRoutingModule } from './banners-routing.module';
import { BannersComponent } from './banners.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { SingleBannerComponent } from './single-banner/single-banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxImageCompressService } from 'ngx-image-compress';

@NgModule({
  declarations: [
    BannersComponent,
    AddBannerComponent,
    SingleBannerComponent
  ],
  imports: [
    CommonModule,
    BannersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxAutocompleteModule,
    NgMultiSelectDropDownModule.forRoot(),
    ImageCropperModule
    
  ],
  providers:    [ SearchStringPipe,NgxImageCompressService ]
})
export class BannersModule { }
