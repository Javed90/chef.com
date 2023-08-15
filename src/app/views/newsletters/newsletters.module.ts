import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NewslettersRoutingModule } from './newsletters-routing.module';
import { NewslettersComponent } from './newsletters.component';
import { AddEditNewslettersComponent } from './add-edit-newsletters/add-edit-newsletters.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    NewslettersComponent,
    AddEditNewslettersComponent
  ],
  imports: [
    CommonModule,
    NewslettersRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    NgxPaginationModule,
  ],
  providers:    [ SearchStringPipe,DatePipe ]
})
export class NewslettersModule { }
