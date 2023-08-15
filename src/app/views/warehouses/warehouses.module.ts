import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehousesRoutingModule } from './warehouses-routing.module';
import { WarehousesComponent } from './warehouses.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    WarehousesComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    WarehousesRoutingModule
  ]
})
export class WarehousesModule { }
