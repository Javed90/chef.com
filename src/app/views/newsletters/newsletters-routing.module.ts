import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditNewslettersComponent } from './add-edit-newsletters/add-edit-newsletters.component';
import { NewslettersComponent } from './newsletters.component';

const routes: Routes = [
  {
    path: '',
    component: NewslettersComponent
  },{
    path: 'add',
    component: AddEditNewslettersComponent
  },
  {
    path: 'edit/:id',
    component: AddEditNewslettersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewslettersRoutingModule { }
