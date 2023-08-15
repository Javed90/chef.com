import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleRecipesRoutingModule } from './single-recipes-routing.module';
import { SingleRecipesComponent } from './single-recipes.component';


@NgModule({
  declarations: [SingleRecipesComponent],
  imports: [
    CommonModule,
    SingleRecipesRoutingModule,
  ]
})
export class SingleRecipesModule { }
