import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleRecipesComponent } from './single-recipes.component';

const routes: Routes = [
  {
    path: '',
    component: SingleRecipesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleRecipesRoutingModule { }
