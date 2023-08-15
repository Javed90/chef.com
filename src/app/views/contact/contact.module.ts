import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppinfoComponent } from './appinfo/appinfo.component';


@NgModule({
  declarations: [
    ContactComponent,
    AppinfoComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ContactModule { }
