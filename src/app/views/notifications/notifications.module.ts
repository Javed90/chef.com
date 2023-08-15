import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { AddComponent } from './add/add.component';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NotificationsComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers:    [ SearchStringPipe ]
})
export class NotificationsModule { }
