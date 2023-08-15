import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './collections.component';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionsComponent
  },
  {
    path: 'add',
    component: AddCollectionComponent
  },
  {
    path: 'edit/:id',
    component: AddCollectionComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
