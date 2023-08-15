import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoriesComponent } from './categories.component';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';
import { SubCategoriesDetailComponent } from './sub-categories-detail/sub-categories-detail.component';
import { SubSubCategoriesDetailComponent } from './sub-sub-categories-detail/sub-sub-categories-detail.component';
const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'edit/:id',
    component: AddCategoryComponent
  },
  {
    path: 'detail/:id',
    component: CategoriesDetailComponent
  },
  {
    path: 'sub-categories/detail',
    component: SubCategoriesDetailComponent
  },
  {
    path: 'sub-sub-categories/detail',
    component: SubSubCategoriesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
