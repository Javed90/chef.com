import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from '../single-product/single-product.component'
import { SingleProductRoutingModule } from './single-product-routing.module';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SingleProductComponent
  ],
  imports: [
    CommonModule,
    SingleProductRoutingModule,
    FormsModule
  ],
  providers:    [ SearchStringPipe ]
})
export class SingleProductModule { }
