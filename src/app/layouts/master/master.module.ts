import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import {FooterComponent} from '../partials/footer/footer.component';
import {HeaderComponent} from '../partials/header/header.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SidebarMenuComponent } from '../partials/sidebar-menu/sidebar-menu.component';


@NgModule({
  declarations: [
    MasterComponent,
    SidebarMenuComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MasterComponent,
    SidebarMenuComponent
  ]
})
export class MasterModule { }
